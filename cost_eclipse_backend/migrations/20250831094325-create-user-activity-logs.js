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
    await queryInterface.createTable('user_activity_logs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      action: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      resource_type: {
        type: Sequelize.STRING(50),
      },
      resource_id: {
        type: Sequelize.UUID,
      },
      ip_address: {
        type: Sequelize.INET,
      },
      user_agent: {
        type: Sequelize.TEXT,
      },
      location: {
        type: Sequelize.STRING(255),
      },
      metadata: {
        type: Sequelize.JSONB,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Constraints
    await queryInterface.sequelize.query(`
      ALTER TABLE user_activity_logs
      ADD CONSTRAINT chk_action_nonempty CHECK (char_length(action) > 0);
    `);

    // Indexes
    await queryInterface.addIndex('user_activity_logs', ['user_id'], { name: 'idx_user_activity_logs_user_id' });
    await queryInterface.addIndex('user_activity_logs', ['action'], { name: 'idx_user_activity_logs_action' });
    await queryInterface.addIndex('user_activity_logs', ['resource_type', 'resource_id'], { name: 'idx_user_activity_logs_resource' });
    await queryInterface.addIndex('user_activity_logs', ['created_at'], { name: 'idx_user_activity_logs_created_at' });

    // Trigger
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_user_activity_logs_created_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.created_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_update_user_activity_logs_created_at
      BEFORE UPDATE ON user_activity_logs
      FOR EACH ROW
      EXECUTE FUNCTION update_user_activity_logs_created_at();
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_update_user_activity_logs_created_at ON user_activity_logs`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS update_user_activity_logs_created_at`);
    await queryInterface.dropTable('user_activity_logs');
  }
};
