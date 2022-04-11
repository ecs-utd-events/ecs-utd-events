const functions = require("firebase-functions");
const { addEntry, deleteEntry, getAllEntries, updateEntry } = require("./src/entryController");
const { addOrg, getAllOrgs, getOneOrg } = require("./src/orgsController");
const { addTag, getAllTags, updateTag, deleteTag } = require("./src/tagsController");
const { addEvent, getAllEvents } = require("./src/eventsController");
const { postTestOrgs } = require("./src/postTestingData")
const { app } = require("./src/config/firebase")

// API endpoint
app.get('/', (req, res) => {
    return res.status(200).send('Hello from Firebase! :)');
});

// Entries API
app.post('/entries', addEntry);
app.get('/entries', getAllEntries);
app.patch('/entries/:entryId', updateEntry);
app.delete('/entries/:entryId', deleteEntry);

// Organizations API
app.post('/organizations', addOrg);
app.get('/organizations', getAllOrgs);
app.get('/organizations/:orgId', getOneOrg);

// Tags API
app.post('/tags', addTag);
app.get('/tags', getAllTags);
app.patch('/tags/:tagId', updateTag);
app.delete('/tags/:tagId', deleteTag);

// Events API
app.post('/events', addEvent);
app.get('/events', getAllEvents);

// POST Testing Data API
app.get('/postTestOrgs', postTestOrgs)

exports.app = functions.https.onRequest(app);
