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
    await queryInterface.createTable('user_suggestions', {
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
      template_id: {
        type: Sequelize.UUID,
        references: { model: 'suggestion_templates', key: 'id' },
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
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      action_text: {
        type: Sequelize.STRING(100),
      },
      action_type: {
        type: Sequelize.STRING(50),
      },
      action_data: {
        type: Sequelize.JSONB,
      },
      priority: {
        type: Sequelize.STRING(10),
        defaultValue: 'medium',
      },
      status: {
        type: Sequelize.STRING(20),
        defaultValue: 'active',
      },
      section: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      expires_at: {
        type: Sequelize.DATE,
      },
      applied_at: {
        type: Sequelize.DATE,
      },
      dismissed_at: {
        type: Sequelize.DATE,
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
      ALTER TABLE user_suggestions
      ADD CONSTRAINT chk_priority CHECK (priority IN ('low', 'medium', 'high'));
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE user_suggestions
      ADD CONSTRAINT chk_status CHECK (status IN ('active', 'dismissed', 'applied', 'expired'));
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE user_suggestions
      ADD CONSTRAINT chk_title_nonempty CHECK (char_length(title) > 0);
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE user_suggestions
      ADD CONSTRAINT chk_description_nonempty CHECK (char_length(description) > 0);
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE user_suggestions
      ADD CONSTRAINT chk_section_nonempty CHECK (char_length(section) > 0);
    `);

    // Indexes
    await queryInterface.addIndex('user_suggestions', ['user_id'], { name: 'idx_user_suggestions_user_id' });
    await queryInterface.addIndex('user_suggestions', ['template_id'], { name: 'idx_user_suggestions_template_id' });
    await queryInterface.addIndex('user_suggestions', ['status'], { name: 'idx_user_suggestions_status' });
    await queryInterface.addIndex('user_suggestions', ['priority'], { name: 'idx_user_suggestions_priority' });
    await queryInterface.addIndex('user_suggestions', ['expires_at'], { name: 'idx_user_suggestions_expires_at' });

    // Trigger for updated_at
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_user_suggestions_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_update_user_suggestions_updated_at
      BEFORE UPDATE ON user_suggestions
      FOR EACH ROW
      EXECUTE FUNCTION update_user_suggestions_updated_at();
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_update_user_suggestions_updated_at ON user_suggestions`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS update_user_suggestions_updated_at`);
    await queryInterface.dropTable('user_suggestions');
  }
};
