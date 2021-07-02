require("dotenv").config();
const corsMiddleWare = require("cors");

const express = require("express");

const usersRouter = require("./routers/users.js");
const moviesRouter = require("./routers/movies.js");

const port = process.env.port || 4000;

const app = express();
app.use(corsMiddleWare());

app.use(express.json());

app.use("/users", usersRouter);
app.use("/movies", moviesRouter);

app.get("/", (req, res) => {
  res.send("test reposne");
});

app.listen(port, () => console.log(`server listening on ${port}`));
