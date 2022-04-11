const functions = require("firebase-functions");
const { Collection } = require("./constants");
const { db } = require("./config/firebase");

const addOrg = functions.https.onRequest((req, res) => { 
    const { description, imageUrl, name, shortName, pointOfContact: {fullName, email}, website,
            socialMedia: {discord, facebook, groupme, instagram, linkedin} } = req.body;
    try {
        const org = db.collection(Collection.ORGANIZATIONS).doc();

        const orgObject =  {
            isRegistered: false,
            description,
            imageUrl,
            name,
            shortName,
            slug: name.split(' ').join('-').toLowerCase(),
            socialMedia: {
                discord,
                facebook,
                groupme,
                instagram,
                linkedin,
            },
            pointOfContact: {
                fullName,
                email
            },
            website,
        };

        org.set(orgObject);

        res.status(200).send({
            status: 'Success',
            message: 'Organiziation added successfully!',
            data: orgObject
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});


const getOneOrg = functions.https.onRequest(async (req, res) => {
    const { id } = req.body;
    try {
        const querySnapshot = await getDoc(id);
        const org = querySnapshot.data();
        return res.status(200).json(org);

    } catch (error) {
        return res.status(500).json(error.message);
    }
});

const getAllOrgs = functions.https.onRequest(async (req, res) => {
    try {
        let  allOrgs = [];
        const querySnapshot = await db.collection(Collection.ORGANIZATIONS).get();
        querySnapshot.forEach((doc) => allOrgs.push(doc.data()));

        return res.status(200).json(allOrgs);

    } catch (error) {
        return res.status(500).json(error.message);
    }
});

module.exports = { addOrg, getAllOrgs, getOneOrg };
