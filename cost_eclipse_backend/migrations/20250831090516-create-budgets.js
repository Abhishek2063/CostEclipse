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
    await queryInterface.createTable('budgets', {
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
      category_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'categories', key: 'id' },
        onDelete: 'SET NULL',
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      monthly_limit: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      alert_threshold: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 80.00,
      },
      period_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'budget_periods', key: 'id' },
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
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

     // Indexes
     await queryInterface.addIndex('budgets', ['user_id'], { name: 'idx_budgets_user_id' });
     await queryInterface.addIndex('budgets', ['category_id'], { name: 'idx_budgets_category_id' });
     await queryInterface.addIndex('budgets', ['user_id', 'category_id'], { name: 'idx_budgets_user_category' });
     await queryInterface.addIndex('budgets', ['user_id', 'is_active'], { name: 'idx_budgets_active' });
     await queryInterface.addIndex('budgets', ['start_date', 'end_date'], { name: 'idx_budgets_dates' });
 
     // Constraints
     await queryInterface.sequelize.query(`
       ALTER TABLE budgets ADD CONSTRAINT chk_budget_dates
       CHECK (end_date IS NULL OR end_date >= start_date);
     `);
 
     await queryInterface.sequelize.query(`
       ALTER TABLE budgets ADD CONSTRAINT chk_budget_threshold
       CHECK (alert_threshold BETWEEN 0 AND 100);
     `);
 
     // Trigger for updated_at
     await queryInterface.sequelize.query(`
       CREATE OR REPLACE FUNCTION update_budgets_updated_at()
       RETURNS TRIGGER AS $$
       BEGIN
         NEW.updated_at = CURRENT_TIMESTAMP;
         RETURN NEW;
       END;
       $$ LANGUAGE plpgsql;
     `);
 
     await queryInterface.sequelize.query(`
       CREATE TRIGGER trg_update_budgets_updated_at
       BEFORE UPDATE ON budgets
       FOR EACH ROW
       EXECUTE FUNCTION update_budgets_updated_at();
     `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_update_budgets_updated_at ON budgets`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS update_budgets_updated_at`);
    await queryInterface.dropTable('budgets');
  }
};
