const functions = require("firebase-functions")
const express = require("express")

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const app = express()
app.get('/', (req, res) => res.status(200).send('Hello from Firebase!'))
exports.app = functions.https.onRequest(app)
