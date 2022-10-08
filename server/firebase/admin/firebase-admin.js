const firebaseAdmin = require('firebase-admin');

const serviceAccount = require('../service-accounts/kib-exercise-development.json');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});

module.exports = firebaseAdmin;