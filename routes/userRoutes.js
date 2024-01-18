const express = require('express');
const router = express.Router();
require('dotenv').config();
const admin = require('firebase-admin');
//const { userApp } = require('./firebaseAdminInit'); 

admin.initializeApp({
  credential: admin.credential.cert(require('./passenger-view.json')),
  databaseURL:process.env.DATABASE_URL_USER
});

//const db = userApp.database();
const db = admin.database();
router.post('/register', async (req, res) => {
  const { email, password, ...additionalUserData } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    
    const userRef = db.ref(`users/${userRecord.uid}`);
    await userRef.set({
      email: userRecord.email,
      ...additionalUserData
    });

    res.status(201).send({ uid: userRecord.uid, email: userRecord.email });
  } catch (error) {
    res.status(500).send({ error: error.code, message: error.message });
  }
});

module.exports = router;
