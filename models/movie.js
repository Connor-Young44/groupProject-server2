"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movie extends Model {
    static associate(models) {
      // define association here
      movie.belongsTo(models.user);
    }
  }
  movie.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      tmdbId: DataTypes.INTEGER,
      isWatched: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "movie",
    }
  );
  return movie;
};
