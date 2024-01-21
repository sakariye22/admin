const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
/*
admin.initializeApp({
  credential: admin.credential.cert(require('./realtime-one.json')),
  databaseURL: process.env.DATABASE_URL_DRIVER
});*/
const driverApp = admin.initializeApp({
    credential: admin.credential.cert(require('./realtime-one.json')),
    databaseURL: process.env.DATABASE_URL_DRIVER
  }, 'driverApp');

  router.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const userRecord = await driverApp.auth().createUser({
        email,
        password,
      });
  
      const userRef = driverApp.database().ref(`drivers/${userRecord.uid}`);
      await userRef.set({ email: userRecord.email });
  
      res.status(201).send({ uid: userRecord.uid, email: userRecord.email });
    } catch (error) {
      res.status(500).send({ error: error.code, message: error.message });
    }
  });





module.exports = router;
