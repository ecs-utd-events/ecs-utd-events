const admin = require("firebase-admin");
const functions = require("firebase-functions")

admin.initializeApp({
    credential: admin.credential.cert({
        privateKey: functions.config().private.key.replace(/\\n/g, '\n'),
        projectId: functions.config().project.id,
        clientEmail: functions.config().client.email
    }),
    databaseURL: 'https://ecs-utd-events.firebaseio.com'
})

const db = admin.firestore()

module.exports = { admin, db }
