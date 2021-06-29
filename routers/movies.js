const { Router } = require("express");

const Movie = require("../models").movie;

const router = new Router();

router.post("/newMovie", async (req, res) => {
  console.log(req.body);
  const { title, userId } = req.body;

  const movie = await Movie.create({
    title: title,
    userId: userId,
    isWatched: false,
  });
  const userMovies = await Movie.findAll({
    where: { userId: userId },
  });

  res.status(200).send({ message: "Movie was added succesfully", userMovies });
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const userMovies = await Movie.findAll({
    where: { userId: userId },
  });
  res.status(200).send({ message: "ok", userMovies });
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
