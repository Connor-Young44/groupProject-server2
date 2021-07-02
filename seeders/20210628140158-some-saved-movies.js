"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "movies",
      [
        {
          title: "Mass Hysteria",
          tmdbId: 592973,
          userId: 1,
          isWatched: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: "movie",
        },
        {
          title: "Who's there?",
          tmdbId: 716931,
          userId: 1,
          isWatched: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          type: "movie",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("movies", null, {});
  },
};
