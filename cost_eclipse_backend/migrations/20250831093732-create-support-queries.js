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
    await queryInterface.createTable('support_queries', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'SET NULL',
      },
      subject: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      priority: {
        type: Sequelize.STRING(10),
        defaultValue: 'medium',
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(20),
        defaultValue: 'open',
      },
      assigned_to: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'SET NULL',
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
    await queryInterface.sequelize.query(`
      ALTER TABLE support_queries
      ADD CONSTRAINT chk_priority CHECK (priority IN ('low', 'medium', 'high'));
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE support_queries
      ADD CONSTRAINT chk_status CHECK (status IN ('open', 'in_progress', 'resolved', 'closed'));
    `);

    // Indexes
    await queryInterface.addIndex('support_queries', ['user_id'], { name: 'idx_support_queries_user_id' });
    await queryInterface.addIndex('support_queries', ['assigned_to', 'status'], { name: 'idx_support_queries_assigned_to_status' });
    await queryInterface.addIndex('support_queries', ['priority'], { name: 'idx_support_queries_priority' });
    await queryInterface.addIndex('support_queries', ['status'], { name: 'idx_support_queries_status' });

    // Trigger for updated_at
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_support_queries_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_update_support_queries_updated_at
      BEFORE UPDATE ON support_queries
      FOR EACH ROW
      EXECUTE FUNCTION update_support_queries_updated_at();
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_update_support_queries_updated_at ON support_queries`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS update_support_queries_updated_at`);
    await queryInterface.dropTable('support_queries');
  }
};
