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
    await queryInterface.createTable('contact_messages', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      full_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      subject: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ip_address: {
        type: Sequelize.INET,
      },
      user_agent: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.STRING(20),
        defaultValue: 'new',
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Constraints
    await queryInterface.sequelize.query(`
      ALTER TABLE contact_messages
      ADD CONSTRAINT chk_full_name_nonempty CHECK (char_length(full_name) > 0);
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE contact_messages
      ADD CONSTRAINT chk_email_format CHECK (
        char_length(email) > 0 
        AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'
      );
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE contact_messages
      ADD CONSTRAINT chk_subject_nonempty CHECK (char_length(subject) > 0);
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE contact_messages
      ADD CONSTRAINT chk_message_nonempty CHECK (char_length(message) > 0);
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE contact_messages
      ADD CONSTRAINT chk_status_valid CHECK (status IN ('new', 'read', 'responded'));
    `);

    // Indexes
    await queryInterface.addIndex('contact_messages', ['email'], { name: 'idx_contact_messages_email' });
    await queryInterface.addIndex('contact_messages', ['status'], { name: 'idx_contact_messages_status' });
    await queryInterface.addIndex('contact_messages', ['created_at'], { name: 'idx_contact_messages_created_at' });

    // Trigger for created_at update
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_contact_messages_created_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.created_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_update_contact_messages_created_at
      BEFORE UPDATE ON contact_messages
      FOR EACH ROW
      EXECUTE FUNCTION update_contact_messages_created_at();
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_update_contact_messages_created_at ON contact_messages`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS update_contact_messages_created_at`);
    await queryInterface.dropTable('contact_messages');
  }
};
