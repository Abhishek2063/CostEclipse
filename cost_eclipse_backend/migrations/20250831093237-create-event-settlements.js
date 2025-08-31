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
    await queryInterface.createTable('event_settlements', {
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
      payer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      payee_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      amount: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(20),
        defaultValue: 'pending',
      },
      settlement_date: {
        type: Sequelize.DATE,
      },
      notes: {
        type: Sequelize.TEXT,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Constraints
    await queryInterface.sequelize.query(`
      ALTER TABLE event_settlements
      ADD CONSTRAINT no_self_settlement CHECK (payer_id != payee_id);
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE event_settlements
      ADD CONSTRAINT chk_completed_settlement_date
      CHECK (status = 'pending' OR settlement_date IS NOT NULL);
    `);

    // Indexes
    await queryInterface.addIndex('event_settlements', ['event_id'], { name: 'idx_event_settlements_event_id' });
    await queryInterface.addIndex('event_settlements', ['payer_id'], { name: 'idx_event_settlements_payer_id' });
    await queryInterface.addIndex('event_settlements', ['payee_id'], { name: 'idx_event_settlements_payee_id' });
    await queryInterface.addIndex('event_settlements', ['status'], { name: 'idx_event_settlements_status' });
    await queryInterface.addIndex('event_settlements', ['event_id', 'payer_id', 'payee_id'], { name: 'idx_event_settlements_event_payer_payee' });

    // Trigger
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION set_settlement_date()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.status = 'completed' AND OLD.status = 'pending' THEN
          NEW.settlement_date := CURRENT_TIMESTAMP;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_set_settlement_date
      BEFORE UPDATE ON event_settlements
      FOR EACH ROW
      EXECUTE FUNCTION set_settlement_date();
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_set_settlement_date ON event_settlements`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS set_settlement_date`);
    await queryInterface.dropTable('event_settlements');
  }
};
