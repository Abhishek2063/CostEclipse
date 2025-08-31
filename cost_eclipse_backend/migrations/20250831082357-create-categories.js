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
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      type_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'category_types', key: 'id' },
        onDelete: 'RESTRICT',
      },
      icon: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      color: {
        type: Sequelize.STRING(7),
        allowNull: true,
        validate: {
          is: /^#[0-9A-Fa-f]{6}$/, // hex color
        },
      },
      is_default: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
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

     // Unique constraint: category name + user + type
     await queryInterface.addConstraint('categories', {
      fields: ['name', 'user_id', 'type_id'],
      type: 'unique',
      name: 'unique_category_per_user_type',
    });

    // Indexes
    await queryInterface.addIndex('categories', ['user_id']);
    await queryInterface.addIndex('categories', ['type_id']);
    await queryInterface.addIndex('categories', ['is_default']);

    await queryInterface.sequelize.query(`
    CREATE OR REPLACE FUNCTION lowercase_category_name()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.name := LOWER(NEW.name);
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);
  
  await queryInterface.sequelize.query(`
    CREATE TRIGGER trg_lowercase_category_name
    BEFORE INSERT OR UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION lowercase_category_name();
  `);
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('categories');
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS lowercase_category_name();`);

  }
};
