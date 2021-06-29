const bcrypt = require("bcrypt");
const { Router } = require("express");

const User = require("../models").user;
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");

const SALT_ROUNDS = 10;

const router = new Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Please provide both email and password" });
  }

  const user = await User.findOne({ where: { email } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).send({
      message: "User with that email not found or password incorrect",
    });
  }
  delete user.dataValues["password"];

  const token = toJWT({ userId: user.id });
  return res.status(200).send({ token, ...user.dataValues });
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Please provide an email, password and a name");
  }

  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
    });
    delete newUser.dataValues["password"];
    const token = toJWT({ userId: newUser.id });
    res.status(201).json({ token, ...newUser.dataValues });
  } catch (error) {
    if (error.email === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  delete req.user.dataValues["password"];
  res.status(200).send({ ...req.user.dataValues });
});

module.exports = router;
