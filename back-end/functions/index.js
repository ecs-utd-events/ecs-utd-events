const express = require("express")
const functions = require("firebase-functions")
const { addEntry, deleteEntry, getAllEntries, updateEntry } = require("./src/entryController")
const { addOrg, getAllOrgs } = require("./src/orgsController")
const { addTag, getAllTags, updateTag, deleteTag } = require("./src/tagsController")
const { addEvent, getAllEvents } = require("./src/eventsController")

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const app = express()

// API endpoint
app.get('/', (req, res) => res.status(200).send('Hello from Firebase!'))

// Entries API
app.post('/entries', addEntry)
app.get('/entries', getAllEntries)
app.patch('/entries/:entryId', updateEntry)
app.delete('/entries/:entryId', deleteEntry)

// Organizations API
app.post('/organizations', addOrg)
app.get('/organizations', getAllOrgs)


// Tags API
app.post('/tags', addTag)
app.get('/tags', getAllTags)
app.patch('/tags/:tagsId', updateTag)
app.delete('/tags/:tagsId', deleteTag)

// Events API
app.post('/events', addEvent)
app.get('/events', getAllEvents)

exports.app = functions.https.onRequest(app)
