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
    await queryInterface.createTable('user_preferences', {
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
      theme_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'themes', key: 'id' },
        onDelete: 'SET NULL',
      },
      currency_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'currencies', key: 'id' },
        onDelete: 'SET NULL',
      },
      language: {
        type: Sequelize.STRING(5),
        defaultValue: 'en',
      },
      notification_email: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      notification_push: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      notification_sms: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

    // Index for quick lookups
    await queryInterface.addIndex('user_preferences', ['user_id']);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('user_preferences');
  }
};
