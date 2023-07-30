var express = require("express");
var router = express.Router();
var pool = require("../config/config.js");

// Route untuk menampilkan data seluruh list film
router.get("/", (req, res) => {
    pool.query("SELECT * FROM film", (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});
// Route untuk menampilkan data list film berdassarkan id
router.get("/:id", (req, res) => {
    const film_id = req.params.id;
    pool.query(
        "SELECT * FROM film WHERE film_id = $1",
        [film_id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (result.rowCount === 0) {
                    return res.status(404).json({ message: "Film not found" });
                }
                res.json(result.rows[0]);
            }
        }
    );
});

// Route untuk menampilkan data list film berdasarkan category
router.get("/category/:category", (req, res) => {
    const categoryName = req.params.category;
    pool.query(
        `
        SELECT *
        FROM film
        JOIN film_category ON film.film_id = film_category.film_id
        JOIN category ON film_category.category_id = category.category_id
        WHERE category.name = $1
      `,
        [categoryName],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (result.rowCount === 0) {
                    return res
                        .status(404)
                        .json({ message: "Film by Category Name not found" });
                }
                res.json(result.rows);
            }
        }
    );
});

module.exports = router;
