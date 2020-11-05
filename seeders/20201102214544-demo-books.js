'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Books",
    [    
    {
      title: 'Becoming',
      author: 'Michelle Obama',
      genre: 'Autobiograpy',
      createdAt: new Date(),
      updatedAt: new Date(),
      readerId: 1,
  },
  {
      title: 'The Alchemist',
      author: 'Paul Coelho',
      genre: 'Adventure',
      createdAt: new Date(),
      updatedAt: new Date(),
      readerId: 2,
  },
  {
      title: 'A Piece of Cake',
      author: 'Cupcake Brown',
      genre: 'Autobiography',
      createdAt: new Date(),
      updatedAt: new Date(), 
      readerId: 3,   
  }, 
  {
      title: 'An American Marriage',
      author: 'Tayari Jones',
      genre: 'Fiction',
      createdAt: new Date(),
      updatedAt: new Date(),
      readerId: 4,
  }

]
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    )
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
