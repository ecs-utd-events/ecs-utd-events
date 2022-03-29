const { cors, db } = require('./config/firebase')
const functions = require("firebase-functions")

const addEvent = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const { description, endTime, link, location, startTime, title } = req.body
        try {
            const event = db.collection('events').doc()

            const eventObject =  {
                id: event.id,
                description,
                endTime,
                link,
                location,
                startTime,
                title
            }

            event.set(eventObject)

            res.status(200).send({
                status: 'Success',
                message: 'Event added successfully!',
                data: eventObject
            })

        } catch {
            res.status(500).json 
        }
    })
})

const getAllEvents = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            let allEvents = []
            const querySnapshot = await db.collection('events').get()
            querySnapshot.forEach((doc) => allEvents.push(doc.data()))
            
            return res.status(200).json(allEvents)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    })
})

module.exports = { addEvent, getAllEvents }
