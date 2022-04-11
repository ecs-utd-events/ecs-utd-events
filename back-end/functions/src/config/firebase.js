const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

admin.initializeApp({
    credential: admin.credential.cert({
        privateKey: process.env.FIREBASE_CONFIG_PRIVATEKEY,
        projectId: process.env.FIREBASE_CONFIG_PROJECTID,
        clientEmail: process.env.FIREBASE_CONFIG_CLIENTEMAIL
    }),
    databaseURL: process.env.DATABASE_URL
});

const app = express();
app.use(cors({ origin: true }));

const db = admin.firestore();

module.exports = { admin, app, db, cors };
