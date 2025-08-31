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
    await queryInterface.createTable('query_attachments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      query_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'support_queries', key: 'id' },
        onDelete: 'CASCADE',
      },
      filename: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      file_url: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      file_size: {
        type: Sequelize.INTEGER,
      },
      mime_type: {
        type: Sequelize.STRING(100),
      },
      uploaded_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Constraints
    await queryInterface.sequelize.query(`
      ALTER TABLE query_attachments
      ADD CONSTRAINT chk_filename_nonempty CHECK (char_length(filename) > 0);
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE query_attachments
      ADD CONSTRAINT chk_file_url_nonempty CHECK (char_length(file_url) > 0);
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE query_attachments
      ADD CONSTRAINT chk_file_size CHECK (file_size IS NULL OR file_size >= 0);
    `);

    // Indexes
    await queryInterface.addIndex('query_attachments', ['query_id'], { name: 'idx_query_attachments_query_id' });
    await queryInterface.addIndex('query_attachments', ['mime_type'], { name: 'idx_query_attachments_mime_type' });
    await queryInterface.addIndex('query_attachments', ['uploaded_at'], { name: 'idx_query_attachments_uploaded_at' });

    // Trigger for uploaded_at auto-update
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_query_attachments_uploaded_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.uploaded_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_update_query_attachments_uploaded_at
      BEFORE UPDATE ON query_attachments
      FOR EACH ROW
      EXECUTE FUNCTION update_query_attachments_uploaded_at();
    `);
  },


  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_update_query_attachments_uploaded_at ON query_attachments`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS update_query_attachments_uploaded_at`);
    await queryInterface.dropTable('query_attachments');
  }
};
