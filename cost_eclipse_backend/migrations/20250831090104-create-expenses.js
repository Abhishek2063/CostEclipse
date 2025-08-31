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

    await queryInterface.createTable('expenses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'categories', key: 'id' },
        onDelete: 'SET NULL',
      },
      amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      payment_method_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'payment_methods', key: 'id' },
        onDelete: 'SET NULL',
      },
      note: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_recurring: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      recurring_frequency_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'recurring_frequencies', key: 'id' },
        onDelete: 'SET NULL',
      },
      next_occurrence: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      is_personal: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      receipt_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Indexes
    await queryInterface.addIndex('expenses', ['user_id'], { name: 'idx_expenses_user_id' });
    await queryInterface.addIndex('expenses', ['category_id'], { name: 'idx_expenses_category_id' });
    await queryInterface.addIndex('expenses', ['payment_method_id'], { name: 'idx_expenses_payment_method_id' });
    await queryInterface.addIndex('expenses', ['date'], { name: 'idx_expenses_date' });

    // Constraint
    await queryInterface.sequelize.query(`
      ALTER TABLE expenses ADD CONSTRAINT chk_expenses_recurring_validity
      CHECK (
        (is_recurring = true AND recurring_frequency_id IS NOT NULL)
        OR (is_recurring = false AND recurring_frequency_id IS NULL)
      );
    `);

    // Trigger for updated_at
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_expenses_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_update_expenses_updated_at
      BEFORE UPDATE ON expenses
      FOR EACH ROW
      EXECUTE FUNCTION update_expenses_updated_at();
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_update_expenses_updated_at ON expenses`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS update_expenses_updated_at`);
    await queryInterface.dropTable('expenses');
  }
};
