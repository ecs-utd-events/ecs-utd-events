const { cors, db } = require('./config/firebase')
const functions = require("firebase-functions")

const addTag = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const { name } = req.body
        try {
            // Create a new doc in the tags collection
            const tag = db.collection('tags').doc()

            // Create a tag object
            const tagObject =  {
                id: tag.id,
                name
            }

            // Update the tag
            tag.set(tagObject)

            res.status(200).send({
                status: 'Success',
                message: 'Tag added successfully!',
                data: tagObject
            })

        } catch {
            res.status(500).json 
        }
    })
})

const getAllTags = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            let allTags = []
            const querySnapshot = await db.collection('tags').get()
            querySnapshot.forEach((doc) => allTags.push(doc.data()))
            
            return res.status(200).json(allTags)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    })
})

const updateTag = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const { body: { name }, params: { tagId } } = req
        try {
            const tag = db.collection('tags').doc(tagId)
            const currentData = (await tag.get()).data() || {}

            const tagObject = {
                name: name || currentData.name
            }
            await tag.set(tagObject)

            return res.status(200).json({
                status: 'Success',
                message: 'Tag updated successfully!',
                data: tagObject
            })
        } catch(error) {
            return res.status(500).json(error.message)
        }
    })
})

const deleteTag = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const { tagId } = req.params
        try {
            const tag = db.collection('tags').doc(tagId)

            await tag.delete()

            return res.status(200).json({
                status: 'Success',
                message: 'Tag deleted successfully!'
            })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    })
})

module.exports = { addTag, getAllTags, deleteTag, updateTag }
