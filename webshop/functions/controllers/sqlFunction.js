const functions = require("firebase-functions");
const express = require("express");
const usersApp = express();

const cors = require("cors");
usersApp.use(cors({origin: true}));

const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 1,
  socketPath: "/cloudsql/" + "webshop-316612:europe-west3:webshop",
  user: "root",
  password: "webshop",
  database: "Nutzerinfo",
});

// get all users
usersApp.get("/", async (req, res) => {
  // using pool instead of creating connection with function call
  pool.query("SELECT * FROM Nutzerinformation;", function(err, results) {
    if (err != null) {
      res.status(400).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

// get user by Email
usersApp.get("/:email", async (req, res) => {
  // using pool instead of creating connection with function call
  pool.query(
      "SELECT * FROM Nutzerinformation where email = ?",
      req.params.email,
      function(err, results) {
        if (err != null) {
          res.status(400).send(err);
        } else {
          res.status(200).send(results);
        }
      },
  );
});

usersApp.post("/submit", async (req, res) => {
  // using pool instead of creating connection with function call
  pool.query(
      "INSERT INTO Nutzerinformation " +
        "(email, nachname, vorname, telefonnummer, adresse) values (\"" +
        req.body.email +
        "\", \"" +
        req.body.nachname +
        "\", \"" +
        req.body.vorname +
        "\", \"" +
        req.body.telefonnummer +
        "\", \"" +
        req.body.adresse +
        "\" );",
      function(err, results) {
        if (err != null) {
          res.status(400).send(err);
        } else {
          res.status(201).send(results);
        }
      },
  );
});

exports.users = functions.region("europe-west3").https.onRequest(usersApp);
