'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Companies', [
      {
        id: 1,
        name: 'Warner Brothers',
        streetAddress: '123 Main St.',
        city: 'Burbank',
        state: 'CA',
        zipcode: '90001',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Disney',
        streetAddress: '321 Main St.',
        city: 'Anaheim',
        state: 'CA',
        zipcode: '91001',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Target',
        streetAddress: '111 Huntington Dr.',
        city: 'Alhambra',
        state: 'CA',
        zipcode: '94001',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
