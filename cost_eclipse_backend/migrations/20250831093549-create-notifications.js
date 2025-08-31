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
    await queryInterface.createTable('notifications', {
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
      type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      data: {
        type: Sequelize.JSONB,
      },
      is_read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      priority: {
        type: Sequelize.STRING(10),
        defaultValue: 'normal',
      },
      expires_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Constraints
    await queryInterface.sequelize.query(`
      ALTER TABLE notifications
      ADD CONSTRAINT chk_type CHECK (type IN ('expense', 'income', 'budget', 'saving', 'event', 'system', 'friend_request'));
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE notifications
      ADD CONSTRAINT chk_priority CHECK (priority IN ('low', 'normal', 'high'));
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE notifications
      ADD CONSTRAINT chk_expires_after_created CHECK (expires_at IS NULL OR expires_at > created_at);
    `);

    // Indexes
    await queryInterface.addIndex('notifications', ['user_id'], { name: 'idx_notifications_user_id' });
    await queryInterface.addIndex('notifications', ['user_id', 'is_read'], { name: 'idx_notifications_user_id_is_read' });
    await queryInterface.addIndex('notifications', ['type'], { name: 'idx_notifications_type' });
    await queryInterface.addIndex('notifications', ['priority'], { name: 'idx_notifications_priority' });
    await queryInterface.addIndex('notifications', ['expires_at'], { name: 'idx_notifications_expires_at' });

    // Trigger: auto-delete expired notifications
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION delete_expired_notifications()
      RETURNS TRIGGER AS $$
      BEGIN
        DELETE FROM notifications WHERE expires_at IS NOT NULL AND expires_at < CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_cleanup_expired_notifications
      AFTER INSERT OR UPDATE ON notifications
      FOR EACH STATEMENT
      EXECUTE FUNCTION delete_expired_notifications();
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_cleanup_expired_notifications ON notifications`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS delete_expired_notifications`);
    await queryInterface.dropTable('notifications');
  }
};
