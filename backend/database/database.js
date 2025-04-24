const mongoose = require("mongoose");

function database() {
  mongoose
    .connect(`${process.env.DATABASE_URL}`)
    .then(() => console.log("Database Connected"));
}

module.exports = database;
