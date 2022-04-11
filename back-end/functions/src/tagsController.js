const functions = require("firebase-functions");
const { Collection } = require("./constants");
const { db } = require("./config/firebase");

const addTag = functions.https.onRequest(async (req, res) => {
    const { name } = req.body;
    try {
        const tag = db.collection(Collection.TAGS).doc();

        const tagObject =  {
            name
        };

        tag.set(tagObject);

        res.status(200).send({
            status: 'Success',
            message: 'Tag added successfully!',
            data: tagObject
        });

    } catch (error) {
        return res.status(500).json(error.message);
    }
});

const getAllTags = functions.https.onRequest(async (req, res) => {
    try {
        let allTags = [];
        const querySnapshot = await db.collection(Collection.TAGS).get();
        querySnapshot.forEach((doc) => allTags.push(doc.data()));
        
        return res.status(200).json(allTags);

    } catch (error) {
        return res.status(500).json(error.message);
    }
});

const updateTag = functions.https.onRequest(async (req, res) => {
    const { body: { name }, params: { tagId } } = req;
    try {
        const tag = db.collection(Collection.TAGS).doc(tagId);
        const currentData = (await tag.get()).data() || {};

        const tagObject = {
            name: name || currentData.name
        };
        await tag.set(tagObject);

        return res.status(200).json({
            status: 'Success',
            message: 'Tag updated successfully!',
            data: tagObject
        });
    } catch(error) {
        return res.status(500).json(error.message);
    }
});

const deleteTag = functions.https.onRequest(async (req, res) => {
    const { tagId } = req.params;
    try {
        const tag = db.collection(Collection.TAGS).doc(tagId);

        await tag.delete();

        return res.status(200).json({
            status: 'Success',
            message: 'Tag deleted successfully!'
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

module.exports = { addTag, getAllTags, deleteTag, updateTag };
