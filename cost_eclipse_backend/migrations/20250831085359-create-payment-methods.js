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
    await queryInterface.createTable('payment_methods', {
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
      type_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'payment_method_types', key: 'id' },
        onDelete: 'RESTRICT',
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      account_number: {
        type: Sequelize.STRING(50),
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
    });

    await queryInterface.addIndex('payment_methods', ['user_id'], {
      name: 'idx_payment_methods_user_id',
    });

    await queryInterface.addConstraint('payment_methods', {
      fields: ['user_id', 'name'],
      type: 'unique',
      name: 'uq_payment_method_user_name',
    });

    await queryInterface.addConstraint('payment_methods', {
      fields: ['user_id', 'account_number'],
      type: 'unique',
      name: 'uq_payment_method_user_account',
      where: { account_number: { [Sequelize.Op.ne]: null } },
    });

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION lowercase_account_number()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.account_number IS NOT NULL THEN
          NEW.account_number := LOWER(NEW.account_number);
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_lowercase_account_number
      BEFORE INSERT OR UPDATE ON payment_methods
      FOR EACH ROW
      EXECUTE FUNCTION lowercase_account_number();
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_lowercase_account_number ON payment_methods`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS lowercase_account_number`);

    await queryInterface.dropTable('payment_methods');
  }
};
