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
    await queryInterface.createTable('event_participants', {
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
      user_id: {
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      email: {
        type: Sequelize.STRING(255),
      },
      name: {
        type: Sequelize.STRING(255),
      },
      role: {
        type: Sequelize.STRING(20),
        defaultValue: 'contributor',
      },
      status: {
        type: Sequelize.STRING(20),
        defaultValue: 'invited',
      },
      joined_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Constraints
    await queryInterface.addConstraint('event_participants', {
      fields: ['event_id', 'user_id'],
      type: 'unique',
      name: 'uq_event_user',
    });

    await queryInterface.addConstraint('event_participants', {
      fields: ['event_id', 'email'],
      type: 'unique',
      name: 'uq_event_email',
    });

    await queryInterface.addConstraint('event_participants', {
      fields: ['user_id', 'email'],
      type: 'check',
      where: {
        [Sequelize.Op.or]: [
          { user_id: { [Sequelize.Op.ne]: null } },
          { email: { [Sequelize.Op.ne]: null } },
        ],
      },
      name: 'chk_participant_identity',
    });

    // Indexes
    await queryInterface.addIndex('event_participants', ['event_id'], { name: 'idx_event_participants_event_id' });
    await queryInterface.addIndex('event_participants', ['user_id'], { name: 'idx_event_participants_user_id' });
    await queryInterface.addIndex('event_participants', ['email'], { name: 'idx_event_participants_email' });
    await queryInterface.addIndex('event_participants', ['status'], { name: 'idx_event_participants_status' });

    // Trigger: lowercase email
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION lowercase_event_participant_email()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.email IS NOT NULL THEN
          NEW.email := LOWER(NEW.email);
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_lowercase_event_participant_email
      BEFORE INSERT OR UPDATE ON event_participants
      FOR EACH ROW
      EXECUTE FUNCTION lowercase_event_participant_email();
    `);
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_lowercase_event_participant_email ON event_participants`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS lowercase_event_participant_email`);
    await queryInterface.dropTable('event_participants');
  }
};
