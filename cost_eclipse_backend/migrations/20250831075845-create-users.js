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

    // Enable pgcrypto for UUIDs if not already enabled
    await queryInterface.sequelize.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      profile_picture: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      occupation: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      monthly_income: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },
      monthly_saving_goal: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },
      role_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Or RESTRICT if you don’t want users without roles
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      email_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      email_verification_token: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      password_reset_token: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      password_reset_expires: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      last_login: {
        type: Sequelize.DATE,
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
     await queryInterface.addIndex('users', ['email'], {
      unique: true,
      name: 'idx_users_email',
    });
    await queryInterface.addIndex('users', ['role_id'], {
      name: 'idx_users_role_id',
    });
    await queryInterface.addIndex('users', ['is_active'], {
      name: 'idx_users_is_active',
    });


     // Rule: always lowercase email on insert/update
     await queryInterface.sequelize.query(`
     CREATE OR REPLACE FUNCTION lowercase_email()
     RETURNS TRIGGER AS $$
     BEGIN
       NEW.email := LOWER(NEW.email);
       RETURN NEW;
     END;
     $$ LANGUAGE plpgsql;
   `);

   await queryInterface.sequelize.query(`
     CREATE TRIGGER trg_lowercase_email
     BEFORE INSERT OR UPDATE ON users
     FOR EACH ROW
     EXECUTE FUNCTION lowercase_email();
   `);
 },

  

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('users');
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS lowercase_email();`);
  }
};
