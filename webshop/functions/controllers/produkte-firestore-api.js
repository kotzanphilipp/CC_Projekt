const functions = require("firebase-functions");
const express = require("express");
const produkteApp = express();

const cors = require("cors");
produkteApp.use(cors({origin: true}));

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

// Authorisierung Middleware
// const authMiddleware = require("./auth-middleware");
// produkteApp.use(authMiddleware);

// Get All Produkts
produkteApp.get("/", async (req, res) => {
  const snapshot = await db.collection("produkte").get();
  const produkte = [];
  snapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();
    produkte.push({id, ...data});
  });
  res.status(200).send(JSON.stringify(produkte));
});

// Add a new Produkt
produkteApp.post("/", async (req, res) => {
  const user = req.body;
  await db.collection("produkte").add(user);
  res.status(201).send("Produkt wurde erfolgreich erstellt");
});

// Get a Single Produkt bei ID
produkteApp.get("/:id", async (req, res) => {
  const snapshot = await db.collection("produkte").doc(req.params.id).get();
  const userId = snapshot.id;
  const userData = snapshot.data();
  res.status(200).send(JSON.stringify({id: userId, ...userData}));
});

// Update a Produkt
produkteApp.put("/:id", async (req, res) => {
  const body = req.body;
  await db.collection("produkte").doc(req.params.id).update(body);
  res.status(200).send("Produkt wurde erfolgreich bearbeitet");
});

// Delete a Produkt
produkteApp.delete("/:id", async (req, res) => {
  await db.collection("produkte").doc(req.params.id).delete();
  res.status(200).send("Produkt wurde erfolgreich gelöscht");
});

exports.produkte = functions.region("europe-west3").https
    .onRequest(produkteApp);
