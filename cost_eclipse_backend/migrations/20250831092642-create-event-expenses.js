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
    await queryInterface.createTable('event_expenses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      event_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'events', key: 'id' },
        onDelete: 'CASCADE',
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
      },
      category_id: {
        type: Sequelize.UUID,
        references: { model: 'categories', key: 'id' },
      },
      paid_by: {
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' },
      },
      paid_by_name: {
        type: Sequelize.STRING(255),
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
      },
      receipt_url: {
        type: Sequelize.TEXT,
      },
      split_type: {
        type: Sequelize.STRING(20),
        defaultValue: 'equal',
      },
      currency: {
        type: Sequelize.STRING(3),
        defaultValue: 'USD',
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

    // Check constraint: at least one identity for "paid_by"
    await queryInterface.sequelize.query(`
      ALTER TABLE event_expenses
      ADD CONSTRAINT chk_paid_by_identity
      CHECK (paid_by IS NOT NULL OR paid_by_name IS NOT NULL);
    `);

    // Indexes
    await queryInterface.addIndex('event_expenses', ['event_id'], { name: 'idx_event_expenses_event_id' });
    await queryInterface.addIndex('event_expenses', ['created_by'], { name: 'idx_event_expenses_created_by' });
    await queryInterface.addIndex('event_expenses', ['paid_by'], { name: 'idx_event_expenses_paid_by' });
    await queryInterface.addIndex('event_expenses', ['category_id'], { name: 'idx_event_expenses_category_id' });
    await queryInterface.addIndex('event_expenses', ['date'], { name: 'idx_event_expenses_date' });

    // Trigger: auto update updated_at
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_event_expenses_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_update_event_expenses_updated_at
      BEFORE UPDATE ON event_expenses
      FOR EACH ROW
      EXECUTE FUNCTION update_event_expenses_updated_at();
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_update_event_expenses_updated_at ON event_expenses`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS update_event_expenses_updated_at`);
    await queryInterface.dropTable('event_expenses');
  }
};
