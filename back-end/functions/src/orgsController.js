const { cors, db } = require('./config/firebase')
const functions = require("firebase-functions")

const addOrg = functions.https.onRequest((req, res) => { 
    cors(req, res, async () => { 
        const { description, image, name, shortName, pointOfContact: {fullName, email},
            socialMedia: {discord, facebook, groupme, instagram, linkedin} } = req.body
        try {
            const org = db.collection('organizations').doc()

            const orgObject =  {
                id: org.id,
                isApproved: false,
                description,
                image,
                name,
                shortName,
                slug: name.replaceAll(' ', '-').toLowerCase(),
                socialMedia: {
                    discord,
                    facebook,
                    groupme,
                    instagram,
                    linkedin
                },
                pointOfContact: {
                    fullName,
                    email
                }
            }

            org.set(orgObject)

            res.status(200).send({
                status: 'Success',
                message: 'Organiziation added successfully!',
                data: orgObject
            })
        } catch {
            res.status(500).json 
        }
    })
})


const getAllOrgs = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            let  allOrgs = []
            const querySnapshot = await db.collection('organizations').get()
            querySnapshot.forEach((doc) => allOrgs.push(doc.data()))
            
            return res.status(200).json(allOrgs)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    })
})

module.exports = { addOrg, getAllOrgs }
