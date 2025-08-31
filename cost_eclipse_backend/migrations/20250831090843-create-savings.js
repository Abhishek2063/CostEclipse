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
    await queryInterface.createTable('savings', {
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
      goal_title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      target_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      current_amount: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0,
      },
      target_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'categories', key: 'id' },
        onDelete: 'SET NULL',
      },
      priority_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'saving_priorities', key: 'id' },
      },
      status_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'saving_statuses', key: 'id' },
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
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
     await queryInterface.addIndex('savings', ['user_id'], { name: 'idx_savings_user_id' });
     await queryInterface.addIndex('savings', ['user_id', 'status_id'], { name: 'idx_savings_user_status' });
     await queryInterface.addIndex('savings', ['user_id', 'priority_id'], { name: 'idx_savings_user_priority' });
     await queryInterface.addIndex('savings', ['target_date'], { name: 'idx_savings_target_date' });
 
     // Constraints
     await queryInterface.sequelize.query(`
       ALTER TABLE savings ADD CONSTRAINT chk_savings_progress
       CHECK (current_amount <= target_amount);
     `);
 
     // Trigger: updated_at
     await queryInterface.sequelize.query(`
       CREATE OR REPLACE FUNCTION update_savings_updated_at()
       RETURNS TRIGGER AS $$
       BEGIN
         NEW.updated_at = CURRENT_TIMESTAMP;
         RETURN NEW;
       END;
       $$ LANGUAGE plpgsql;
     `);
 
     await queryInterface.sequelize.query(`
       CREATE TRIGGER trg_update_savings_updated_at
       BEFORE UPDATE ON savings
       FOR EACH ROW
       EXECUTE FUNCTION update_savings_updated_at();
     `);
 
     // Trigger: lowercase goal_title
     await queryInterface.sequelize.query(`
       CREATE OR REPLACE FUNCTION lowercase_goal_title()
       RETURNS TRIGGER AS $$
       BEGIN
         NEW.goal_title := LOWER(NEW.goal_title);
         RETURN NEW;
       END;
       $$ LANGUAGE plpgsql;
     `);
 
     await queryInterface.sequelize.query(`
       CREATE TRIGGER trg_lowercase_goal_title
       BEFORE INSERT OR UPDATE ON savings
       FOR EACH ROW
       EXECUTE FUNCTION lowercase_goal_title();
     `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_update_savings_updated_at ON savings`);
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_lowercase_goal_title ON savings`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS update_savings_updated_at`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS lowercase_goal_title`);
    await queryInterface.dropTable('savings');
  }
};
