const express = require('express');
const router = express.Router();
require('dotenv').config();
const admin = require('firebase-admin');

const userApp = admin.initializeApp({
  credential: admin.credential.cert(require('./passenger-view.json')),
  databaseURL: process.env.DATABASE_URL_USER
}, 'userApp'); 

router.post('/register', async (req, res) => {
  const { email, password, ...additionalUserData } = req.body;

  try {
    console.log('Trying to create user with email:', email);

    const userRecord = await userApp.auth().createUser({
      email,
      password,
    });

    const userRef = userApp.database().ref(`users/${userRecord.uid}`);
    await userRef.set({
      email: userRecord.email,
      ...additionalUserData
    });
    console.log('User created with UID:', userRecord.uid);
    res.status(201).send({ uid: userRecord.uid, email: userRecord.email });
    console.log('Response sent'); 

    res.status(201).send({ uid: userRecord.uid, email: userRecord.email });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).send({ error: error.code, message: error.message });
  }
});

module.exports = router;
