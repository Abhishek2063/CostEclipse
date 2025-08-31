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
    await queryInterface.createTable('smart_categories', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      keywords: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      parent_category: {
        type: Sequelize.STRING(100),
      },
      suggested_budget_percentage: {
        type: Sequelize.DECIMAL(5,2),
      },
      icon: {
        type: Sequelize.STRING(50),
      },
      color: {
        type: Sequelize.STRING(7),
      },
      is_system_generated: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Constraints
    await queryInterface.sequelize.query(`
      ALTER TABLE smart_categories
      ADD CONSTRAINT chk_suggested_budget_percentage CHECK (suggested_budget_percentage >= 0 AND suggested_budget_percentage <= 100);
    `);

    // Indexes
    await queryInterface.addIndex('smart_categories', ['name'], { name: 'idx_smart_categories_name' });
    await queryInterface.addIndex('smart_categories', ['is_system_generated'], { name: 'idx_smart_categories_system' });
    await queryInterface.addIndex('smart_categories', ['usage_count'], { name: 'idx_smart_categories_usage_count' });
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('smart_categories');
  }
};
