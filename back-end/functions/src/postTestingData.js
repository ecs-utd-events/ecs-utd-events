const functions = require("firebase-functions");
const { Collection } = require("./constants");
const { db } = require("./config/firebase");

/**
 * @param {Object} req Express Request Object
 * @param {Object} res Express Request Object
 */

 const postTestOrgs = functions.https.onRequest(async (req, res) => { 
    try {
        const org = db.collection(Collection.ORGANIZATIONS).doc("org001");

        const org001 =  {
            isRegistered: false,
            description: "The SWE UTD stimulates women to achieve full potential in careers as engineers and leaders, expand the image of the engineering profession as a positive force in improving the quality of life, and demonstrate the value of diversity.",
            imageUrl: "https://sweutd.com/static/media/logo.17b3aad893f443ae3839.png",
            name: "Society of Women Engineers",
            slug: "society-of-women-engineers",
            shortName: "SWE",
            socialMedia: {
                discord: "Discord",
                facebook: "Facebook",
                groupme: "GroupMe",
                instagram: "Instagram",
                linkedin: "Linkedin",
            },
            pointOfContact: {
                fullName: "SWE President",
                email: "swe-pres@gmail.com"
            },
            website: "https://sweutd.com/",
        };

        await org.set(org001);

        res.status(200).send({
            status: 'Success',
            message: 'Organizations added successfully!',
            data: org001
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

module.exports = { postTestOrgs };