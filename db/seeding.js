var pool = require("../config/config.js");
var fs = require("fs");

const seedQuery = fs.readFileSync("db/seeding.sql", { encoding: "utf-8" });

pool.query(seedQuery, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Seeding Successfully");
        pool.end();
    }
});
