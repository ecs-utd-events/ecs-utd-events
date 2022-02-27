const { db } = require('./config/firebase')

const addEntry = async (req, res) => {
    const { title, text } = req.body
    try {
        // Create a new doc in the entries collection
        const entry = db.collection('entries').doc()

        // Create an entry object
        const entryObject =  {
            id: entry.id,
            title,
            text
        }

        // Update the entry
        entry.set(entryObject)

        res.status(200).send({
            status: 'success',
            message: 'entry added successfully',
            data: entryObject
        })

    } catch {
        res.status(500).json 
    }
}

const getAllEntries = async (req, res) => {
    try {
        let  allEntries = []
        const querySnapshot = await db.collection('entries').get()
        querySnapshot.forEach((doc) => allEntries.push(doc.data()))
        
        return res.status(200).json(allEntries)

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const updateEntry = async (req, res) => {
    const { body: { text, title }, params: { entryId } } = req
    try {
        const entry = db.collection('entries').doc(entryId)
        const currentData = (await entry.get()).data() || {}

        const entryObject = {
            title: title || currentData.title,
            text: text || currentData.text
        }
        await entry.set(entryObject)

        return res.status(200).json({
            status: 'success',
            message: 'entry updated successfully',
            data: entryObject
        })
    } catch(error) {
        return res.status(500).json(error.message)
    }
}

const deleteEntry = async (req, res) => {
    const { entryId } = req.params
    try {
        const entry = db.collection('entries').doc(entryId)

        await entry.delete()

        return res.status(200).json({
            status: 'success',
            message: 'entry deleted successfully'
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = { addEntry, deleteEntry, getAllEntries, updateEntry }
