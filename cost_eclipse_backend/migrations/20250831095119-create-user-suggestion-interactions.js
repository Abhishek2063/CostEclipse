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
    await queryInterface.createTable('user_suggestion_interactions', {
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
      suggestion_id: {
        type: Sequelize.UUID,
        references: { model: 'user_suggestions', key: 'id' },
        onDelete: 'CASCADE',
      },
      interaction_type: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      interaction_data: {
        type: Sequelize.JSONB,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Constraints
    await queryInterface.sequelize.query(`
      ALTER TABLE user_suggestion_interactions
      ADD CONSTRAINT chk_interaction_type CHECK (interaction_type IN ('view', 'dismiss', 'apply', 'click'));
    `);

    // Indexes
    await queryInterface.addIndex('user_suggestion_interactions', ['user_id'], { name: 'idx_user_suggestion_interactions_user_id' });
    await queryInterface.addIndex('user_suggestion_interactions', ['suggestion_id'], { name: 'idx_user_suggestion_interactions_suggestion_id' });
    await queryInterface.addIndex('user_suggestion_interactions', ['interaction_type'], { name: 'idx_user_suggestion_interactions_type' });
    await queryInterface.addIndex('user_suggestion_interactions', ['created_at'], { name: 'idx_user_suggestion_interactions_created_at' });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('user_suggestion_interactions');
  }
};
