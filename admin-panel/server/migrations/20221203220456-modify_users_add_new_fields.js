"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addColumn("users", "firstname", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    queryInterface.addColumn("users", "lastname", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    queryInterface.addColumn("users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    queryInterface.addColumn("users", "password", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    queryInterface.addColumn("users", "username", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn("users", "userName");
  },
};
