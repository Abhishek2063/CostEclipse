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
    await queryInterface.createTable('friends', {
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
      friend_user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      friend_email: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      friend_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      costeclipse_username: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(20),
        defaultValue: 'pending',
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Constraints
    await queryInterface.addConstraint('friends', {
      fields: ['user_id', 'friend_user_id'],
      type: 'unique',
      name: 'unique_user_friend_pair',
    });

    await queryInterface.addConstraint('friends', {
      fields: ['user_id', 'friend_user_id'],
      type: 'check',
      where: { user_id: { [Sequelize.Op.ne]: Sequelize.col('friend_user_id') } },
      name: 'no_self_friend',
    });

    await queryInterface.addConstraint('friends', {
      fields: ['friend_user_id', 'friend_email'],
      type: 'check',
      where: Sequelize.literal('(friend_user_id IS NOT NULL OR friend_email IS NOT NULL)'),
      name: 'friend_requires_target',
    });

    // Indexes
    await queryInterface.addIndex('friends', ['user_id'], { name: 'idx_friends_user_id' });
    await queryInterface.addIndex('friends', ['friend_user_id'], { name: 'idx_friends_friend_user_id' });
    await queryInterface.addIndex('friends', ['status'], { name: 'idx_friends_status' });
    await queryInterface.addIndex('friends', ['friend_email'], { name: 'idx_friends_friend_email' });

    // Trigger: lowercase email
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION lowercase_friend_email()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.friend_email IS NOT NULL THEN
          NEW.friend_email := LOWER(NEW.friend_email);
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_lowercase_friend_email
      BEFORE INSERT OR UPDATE ON friends
      FOR EACH ROW
      EXECUTE FUNCTION lowercase_friend_email();
    `);

    // Trigger: prevent symmetric friendship
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION prevent_symmetric_friendship()
      RETURNS TRIGGER AS $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM friends
          WHERE user_id = NEW.friend_user_id
            AND friend_user_id = NEW.user_id
        ) THEN
          RAISE EXCEPTION 'Symmetric friendship already exists';
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_prevent_symmetric_friendship
      BEFORE INSERT ON friends
      FOR EACH ROW
      EXECUTE FUNCTION prevent_symmetric_friendship();
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_lowercase_friend_email ON friends`);
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_prevent_symmetric_friendship ON friends`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS lowercase_friend_email`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS prevent_symmetric_friendship`);
    await queryInterface.dropTable('friends');
  }
};
