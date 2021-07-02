const { Router } = require("express");

const Movie = require("../models").movie;

const router = new Router();

router.post("/newMovie", async (req, res) => {
  console.log(req.body);
  const { title, userId, tmdbId, type } = req.body;
  const movie = await Movie.create({
    title: title,
    userId: userId,
    isWatched: false,
    tmdbId: tmdbId,
    type: type,
  });
  const userMovies = await Movie.findAll({
    where: { userId: userId },
  });
  res.status(200).send({ message: "Movie was added succesfully", userMovies });
});

router.delete("/deleteMovie/:id", async (req, res) => {
  console.log(req.params.id);
  const movie = await Movie.destroy({
    where: { id: req.params.id },
  });
  res.status(200).send({ message: "Movie was deleted succesfully", movie });
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const userMovies = await Movie.findAll({
    where: { userId: userId },
  });
  res.status(200).send(userMovies);
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findByPk(id);
  if (movie.dataValues.isWatched) {
    await Movie.update({ isWatched: false }, { where: { id: id } });
  } else {
    await Movie.update({ isWatched: true }, { where: { id: id } });
  }
  res.status(200).send({ message: "movie status changed" });
});

module.exports = router;
