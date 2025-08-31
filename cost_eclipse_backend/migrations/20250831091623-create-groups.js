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
    await queryInterface.createTable('groups', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
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
    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX idx_groups_name_lower ON groups(LOWER(name));
    `);
    await queryInterface.addIndex('groups', ['created_by'], { name: 'idx_groups_created_by' });
    await queryInterface.addIndex('groups', ['is_active'], { name: 'idx_groups_is_active' });

    // Trigger: lowercase name
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION lowercase_group_name()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.name := LOWER(NEW.name);
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_lowercase_group_name
      BEFORE INSERT OR UPDATE ON groups
      FOR EACH ROW
      EXECUTE FUNCTION lowercase_group_name();
    `);

    // Trigger: auto-update updated_at
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_groups_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at := CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_update_groups_updated_at
      BEFORE UPDATE ON groups
      FOR EACH ROW
      EXECUTE FUNCTION update_groups_updated_at();
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_lowercase_group_name ON groups`);
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_update_groups_updated_at ON groups`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS lowercase_group_name`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS update_groups_updated_at`);
    await queryInterface.dropTable('groups');
  }
};
