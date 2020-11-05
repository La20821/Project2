'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Readers",
      [
        {
          name: 'Lauren',
          username: 'Lpizzle',
          password: 'ilove2read'
      },
      {
          name: 'Saul',
          username: 'Saully',
          password: 'time2read'
      },
      {
          name: 'Ricky',
          username: 'Rick',
          password: 'like2read'
      },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
