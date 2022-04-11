const functions = require("firebase-functions");
const { Collection } = require("./constants");
const { db } = require("./config/firebase");

const addEvent = functions.https.onRequest(async (req, res) => {
    const { description, endTime, flyer, lastUpdated, link, location, orgs, startTime, tags, title } = req.body;
    try {
        const event = db.collection(Collection.EVENTS).doc();

        const eventObject =  {
            description,
            endTime,
            flyer,
            link,
            lastUpdated,
            location,
            orgs,
            startTime,
            tags,
            title
        };

        event.set(eventObject);
        res.status(200).send({
            status: 'Success',
            message: 'Event added successfully!',
            data: eventObject
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

const getAllEvents = functions.https.onRequest(async (req, res) => {
    try {
        let allEvents = [];
        const querySnapshot = await db.collection(Collection.EVENTS).get();
        querySnapshot.forEach((doc) => {
            let event = doc.data();

            allEvents.push({
                description: event.description,
                endTime: event.endTime,
                flyer: event.flyer,
                link: event.link,
                lastUpdated: event.lastUpdated,
                location: event.location,
                orgs: event.orgs,
                startTime: event.startTime,
                tags: event.tags,
                title: event.title,
            });
        });

        return res.status(200).json(allEvents);

    } catch (error) {
        return res.status(500).json(error.message);
    }
});

module.exports = { addEvent, getAllEvents };
