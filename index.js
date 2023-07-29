require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const film = require("./routes/film.js");
const category = require("./routes/category.js");

app.get("/", function (req, res) {
    res.send("hello Fajrin");
});

app.use("/film", film);
app.use("/category", category);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
