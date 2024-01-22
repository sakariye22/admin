const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const multer = require('multer');
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });
require('dotenv').config();


/*
admin.initializeApp({
  credential: admin.credential.cert(require('./realtime-one.json')),
  databaseURL: process.env.DATABASE_URL_DRIVER
});*/
const driverApp = admin.initializeApp({
  credential: admin.credential.cert(require('./realtime-one.json')),
  databaseURL: process.env.DATABASE_URL_DRIVER,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET 
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


  router.post('/login', async (req, res) => {
    const { idToken } = req.body;
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const uid = decodedToken.uid;
  
      res.status(200).send({ message: 'Login successful', uid });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(401).send({ error: 'Invalid token' });
    }
  });



/*

  router.post('/details', upload.single('licenseImage'), async (req, res) => {
    const { carModel, fullName } = req.body;
    const { uid } = req;
    const licenseImage = req.file;
  
    try {
      // Upload the license image to Firebase Storage
      const bucket = driverApp.storage().bucket();
      const licenseImageRef = driverApp.storage().bucket().file(`license_images/${licenseImage.originalname}`);
      await licenseImageRef.save(licenseImage.buffer);
  
      const licenseImageUrl = await licenseImageRef.getSignedUrl({
        action: 'read',
        expires: '03-09-2491' // Use an appropriate expiry date
      });
  
      // Set the additional driver details in Firebase Realtime Database
      const userRef = driverApp.database().ref(`drivers/${uid}`);
      await userRef.update({ 
        carModel, 
        fullName,
        licenseImageUrl: licenseImageUrl[0] // getSignedUrl returns an array
      });
  
      res.status(200).send({ message: 'Driver details updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  });
  */
  router.post('/details', upload.single('licenseImage'), async (req, res) => {
    console.log('Received request for /details');
    const { carModel, fullName } = req.body;
    const { uid } = req.body;
    const licenseImage = req.file;
  
    try {
      const bucket = driverApp.storage().bucket();
  
      const licenseImageRef = bucket.file(`license_images/${licenseImage.originalname}`);
  
      await licenseImageRef.save(licenseImage.buffer);
  
      const licenseImageUrl = await licenseImageRef.getSignedUrl({
        action: 'read',
        expires: '03-09-2491' 
      });
  
      const userRef = driverApp.database().ref(`drivers/${uid}`);
      await userRef.update({ 
        carModel, 
        fullName,
        licenseImageUrl: licenseImageUrl[0]
      });
  
      res.status(200).send({ message: 'Driver details updated successfully' });
      console.log('Response sent back to client.');
      
    }   catch (error) {
      console.error('Error during details submission:', error);
      return res.status(500).send({ error: error.toString(), message: 'Failed to process the details.' });
    }
    
  });
  
  module.exports = router;