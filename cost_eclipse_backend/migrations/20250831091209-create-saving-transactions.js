'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('saving_transactions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      saving_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'savings', key: 'id' },
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      transaction_type: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      payment_method_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'payment_methods', key: 'id' },
        onDelete: 'SET NULL',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      transaction_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Indexes
    await queryInterface.addIndex('saving_transactions', ['saving_id'], { name: 'idx_saving_transactions_saving_id' });
    await queryInterface.addIndex('saving_transactions', ['user_id'], { name: 'idx_saving_transactions_user_id' });
    await queryInterface.addIndex('saving_transactions', ['transaction_date'], { name: 'idx_saving_transactions_date' });
    await queryInterface.addIndex('saving_transactions', ['transaction_type'], { name: 'idx_saving_transactions_type' });

    // Trigger: update savings balance
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_saving_balance()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.transaction_type = 'deposit' THEN
          UPDATE savings
          SET current_amount = current_amount + NEW.amount,
              updated_at = CURRENT_TIMESTAMP
          WHERE id = NEW.saving_id;
        ELSIF NEW.transaction_type = 'withdrawal' THEN
          IF (SELECT current_amount FROM savings WHERE id = NEW.saving_id) < NEW.amount THEN
            RAISE EXCEPTION 'Insufficient funds in saving goal';
          END IF;
          UPDATE savings
          SET current_amount = current_amount - NEW.amount,
              updated_at = CURRENT_TIMESTAMP
          WHERE id = NEW.saving_id;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_update_saving_balance
      AFTER INSERT ON saving_transactions
      FOR EACH ROW
      EXECUTE FUNCTION update_saving_balance();
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_update_saving_balance ON saving_transactions`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS update_saving_balance`);
    await queryInterface.dropTable('saving_transactions');
  }
};
