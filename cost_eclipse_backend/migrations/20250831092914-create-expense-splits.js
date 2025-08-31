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
    await queryInterface.createTable('expense_splits', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      expense_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'event_expenses', key: 'id' },
        onDelete: 'CASCADE',
      },
      participant_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'event_participants', key: 'id' },
        onDelete: 'CASCADE',
      },
      amount: {
        type: Sequelize.DECIMAL(12,2),
      },
      percentage: {
        type: Sequelize.DECIMAL(5,2),
      },
      is_settled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      settled_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Unique constraint
    await queryInterface.addConstraint('expense_splits', {
      fields: ['expense_id', 'participant_id'],
      type: 'unique',
      name: 'uq_expense_participant'
    });

    // Check constraints
    await queryInterface.sequelize.query(`
      ALTER TABLE expense_splits
      ADD CONSTRAINT chk_amount_or_percentage
      CHECK (amount IS NOT NULL OR percentage IS NOT NULL);
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE expense_splits
      ADD CONSTRAINT chk_settled_at
      CHECK (is_settled = false OR settled_at IS NOT NULL);
    `);

    // Indexes
    await queryInterface.addIndex('expense_splits', ['expense_id'], { name: 'idx_expense_splits_expense_id' });
    await queryInterface.addIndex('expense_splits', ['participant_id'], { name: 'idx_expense_splits_participant_id' });
    await queryInterface.addIndex('expense_splits', ['is_settled'], { name: 'idx_expense_splits_is_settled' });

    // Trigger for auto-set settled_at
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION set_settled_at()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.is_settled = true AND OLD.is_settled = false THEN
          NEW.settled_at := CURRENT_TIMESTAMP;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_set_settled_at
      BEFORE UPDATE ON expense_splits
      FOR EACH ROW
      EXECUTE FUNCTION set_settled_at();
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_set_settled_at ON expense_splits`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS set_settled_at`);
    await queryInterface.dropTable('expense_splits');
  }
};
