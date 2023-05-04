// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { collection, addDoc } from 'firebase/firestore';
import { database } from '../../database/firebase.js';


function getRandomLatitudeLongitude() {
  const latitude = Math.random() * (90 - (-90)) + (-90);
  const longitude = Math.random() * (180 - (-180)) + (-180);
  return { latitude, longitude };
}

export default async function handler(req, res) {
  try {

    let notification = req.body ? {
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      created: Date.now(),
      isSeen: false,
    } : {
      latitude: getRandomLatitudeLongitude().latitude,
      longitude: getRandomLatitudeLongitude().longitude,
      created: Date.now(),
      isSeen: false,
    };
    const notificationsCollection = collection(database, 'notifications');
    await addDoc(notificationsCollection, notification);
    res.status(201).json({ message: 'Notification added successfully', body: notification });
  } catch (error) {
    console.error('Error adding notification: ', error);
    res.status(500).json({ message: 'Server error' });
  }
}



