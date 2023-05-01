// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { collection, addDoc } from 'firebase/firestore';
import { database } from '../../database/firebase.js';

export default async function handler(req, res) {
  try {

    let notification = req.body ? {
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      created: Date.now(),
      isSeen: false,
    } : {
      latitude: 13.7563,
      longitude: 100.5018,
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



