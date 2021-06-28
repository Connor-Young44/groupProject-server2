'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('movies', [{
        title: 'test',
       userId: 1,
       isWatched: false,
       createdAt: new Date(),
       updatedAt: new Date()
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('movies', null, {});
     
  }
};
