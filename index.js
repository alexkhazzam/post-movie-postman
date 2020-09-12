const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const movieList = JSON.parse(fs.readFileSync(`${__dirname}/movies.json`));

app.get("/movies", (req, res) => {
  res.status(200).json({
    status: "success",
    length: movieList.length,
    data: {
      movieList,
    },
  });
});

app.post("/movies", (req, res) => {
  movieList.push(req.body);
  fs.writeFile(`${__dirname}/movies.json`, JSON.stringify(movieList), (err) => {
    if (err) throw err;
    res.status(201).json({
      status: "success",
      length: movieList.length,
      data: {
        movies: movieList,
      },
    });
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
