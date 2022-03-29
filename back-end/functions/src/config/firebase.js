const admin = require("firebase-admin");
const functions = require("firebase-functions")
const cors = require('cors')({origin: true});

admin.initializeApp({
    credential: admin.credential.cert({
        privateKey: functions.config().private.key.replace(/\\n/g, '\n'),
        projectId: functions.config().project.id,
        clientEmail: functions.config().client.email
    }),
    databaseURL: 'https://ecs-utd-events.firebaseio.com'
})

const app = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        return response.send("Hello from Firebase!")
    })
})

const db = admin.firestore()

module.exports = { admin, app, db, cors }
