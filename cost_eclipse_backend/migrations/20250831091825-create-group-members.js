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
    await queryInterface.createTable('group_members', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      group_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'groups', key: 'id' },
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      role: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'member',
      },
      permissions: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {
          add_expense: true,
          edit_expense: false,
          settle_dues: true,
        },
      },
      joined_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Unique constraint
    await queryInterface.addConstraint('group_members', {
      fields: ['group_id', 'user_id'],
      type: 'unique',
      name: 'unique_group_user',
    });

    // Indexes
    await queryInterface.addIndex('group_members', ['user_id'], { name: 'idx_group_members_user_id' });
    await queryInterface.addIndex('group_members', ['group_id'], { name: 'idx_group_members_group_id' });
    await queryInterface.addIndex('group_members', ['role'], { name: 'idx_group_members_role' });

    // Trigger: lowercase role
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION lowercase_group_member_role()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.role := LOWER(NEW.role);
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_lowercase_group_member_role
      BEFORE INSERT OR UPDATE ON group_members
      FOR EACH ROW
      EXECUTE FUNCTION lowercase_group_member_role();
    `);

    // Trigger: validate permissions JSON
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION validate_group_member_permissions()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NOT (NEW.permissions ? 'add_expense') OR
               NOT (NEW.permissions ? 'edit_expense') OR
               NOT (NEW.permissions ? 'settle_dues') THEN
          RAISE EXCEPTION 'permissions JSON must contain add_expense, edit_expense, settle_dues';
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_validate_group_member_permissions
      BEFORE INSERT OR UPDATE ON group_members
      FOR EACH ROW
      EXECUTE FUNCTION validate_group_member_permissions();
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_lowercase_group_member_role ON group_members`);
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_validate_group_member_permissions ON group_members`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS lowercase_group_member_role`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS validate_group_member_permissions`);
    await queryInterface.dropTable('group_members');
  }
};
