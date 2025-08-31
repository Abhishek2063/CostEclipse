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
    await queryInterface.createTable('events', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      owner_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      group_id: {
        type: Sequelize.UUID,
        references: { model: 'groups', key: 'id' },
        onDelete: 'SET NULL',
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATEONLY,
      },
      initial_contribution: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0,
      },
      total_expenses: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0,
      },
      status: {
        type: Sequelize.STRING(20),
        defaultValue: 'active',
      },
      currency: {
        type: Sequelize.STRING(3),
        defaultValue: 'USD',
      },
      location: {
        type: Sequelize.STRING(255),
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

    // Constraints
    await queryInterface.addConstraint('events', {
      fields: ['owner_id', 'title'],
      type: 'unique',
      name: 'uq_event_owner_title',
    });

    await queryInterface.addConstraint('events', {
      fields: ['end_date', 'start_date'],
      type: 'check',
      where: {
        end_date: { [Sequelize.Op.gte]: Sequelize.col('start_date') },
      },
      name: 'chk_end_after_start',
    });

    // Indexes
    await queryInterface.addIndex('events', ['owner_id'], { name: 'idx_events_owner_id' });
    await queryInterface.addIndex('events', ['group_id'], { name: 'idx_events_group_id' });
    await queryInterface.addIndex('events', ['status'], { name: 'idx_events_status' });
    await queryInterface.addIndex('events', ['currency'], { name: 'idx_events_currency' });

    // Trigger: currency uppercase
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION lowercase_event_currency()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.currency := UPPER(NEW.currency);
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_lowercase_event_currency
      BEFORE INSERT OR UPDATE ON events
      FOR EACH ROW
      EXECUTE FUNCTION lowercase_event_currency();
    `);

    // Trigger: update updated_at
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_event_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_update_event_updated_at
      BEFORE UPDATE ON events
      FOR EACH ROW
      EXECUTE FUNCTION update_event_updated_at();
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_lowercase_event_currency ON events`);
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_update_event_updated_at ON events`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS lowercase_event_currency`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS update_event_updated_at`);
    await queryInterface.dropTable('events');
  }
};
