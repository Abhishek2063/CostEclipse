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
    await queryInterface.createTable('suggestion_templates', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
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
      icon: {
        type: Sequelize.STRING(50),
      },
      priority: {
        type: Sequelize.STRING(10),
        defaultValue: 'medium',
      },
      conditions: {
        type: Sequelize.JSONB,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
      ALTER TABLE suggestion_templates
      ADD CONSTRAINT chk_type CHECK (type IN (
        'expense_optimization', 'budget_alert', 'saving_goal', 'income_opportunity',
        'category_suggestion', 'recurring_pattern', 'spending_insight', 
        'event_planning', 'friend_suggestion', 'payment_method'
      ));
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE suggestion_templates
      ADD CONSTRAINT chk_title_nonempty CHECK (char_length(title) > 0);
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE suggestion_templates
      ADD CONSTRAINT chk_description_nonempty CHECK (char_length(description) > 0);
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE suggestion_templates
      ADD CONSTRAINT chk_priority CHECK (priority IN ('low', 'medium', 'high'));
    `);

    // Indexes
    await queryInterface.addIndex('suggestion_templates', ['type'], { name: 'idx_suggestion_templates_type' });
    await queryInterface.addIndex('suggestion_templates', ['priority'], { name: 'idx_suggestion_templates_priority' });
    await queryInterface.addIndex('suggestion_templates', ['is_active'], { name: 'idx_suggestion_templates_is_active' });
    await queryInterface.addIndex('suggestion_templates', ['created_at'], { name: 'idx_suggestion_templates_created_at' });
    await queryInterface.addIndex('suggestion_templates', ['updated_at'], { name: 'idx_suggestion_templates_updated_at' });

    // Trigger for updated_at
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_suggestion_templates_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_update_suggestion_templates_updated_at
      BEFORE UPDATE ON suggestion_templates
      FOR EACH ROW
      EXECUTE FUNCTION update_suggestion_templates_updated_at();
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_update_suggestion_templates_updated_at ON suggestion_templates`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS update_suggestion_templates_updated_at`);
    await queryInterface.dropTable('suggestion_templates');
  }
};
