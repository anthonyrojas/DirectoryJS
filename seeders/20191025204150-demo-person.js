'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('People', [
      {
        id: 1,
        firstName: 'Janet',
        lastName: 'Snakehole',
        companyId: 1,
        middleInitial: 'R',
        nickname: '',
        suffix: null,
        position: 'President',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        firstName: 'Ben',
        lastName: 'Wyatt',
        companyId: 2,
        middleInitial: 'G',
        nickname: 'Ice Clown',
        suffix: null,
        position: 'Accounting Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        firstName: 'Johnny',
        lastName: 'Karate',
        companyId: 1,
        middleInitial: null,
        nickname: 'Jonathan Karate',
        suffix: null,
        position: 'Counselor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        firstName: 'Ann',
        lastName: 'Perkins',
        companyId: 3,
        middleInitial: null,
        nickname: null,
        suffix: null,
        position: 'Pharmacist',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
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
