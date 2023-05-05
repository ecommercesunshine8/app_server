// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { collection, addDoc } from 'firebase/firestore';
import { database } from '../../database/firebase.js';


let positions = [
  { latitude: 40.7128, longitude: -74.0060 },
  { latitude: 41.8781, longitude: -87.6298 },
  { latitude: 34.0522, longitude: -118.2437 },
  { latitude: 29.7604, longitude: -95.3698 },
  { latitude: 32.7767, longitude: -96.7970 },
  { latitude: 39.7392, longitude: -104.9903 },
];

function getRandomLatitudeLongitude() {
  let randomIndex = Math.floor(Math.random() * positions.length);
  let { latitude, longitude } = positions[randomIndex];
  return { latitude, longitude };
}

async function sendPushNotification() {
  const url = 'https://app.nativenotify.com/api/notification';
  const appId = 7781;
  const appToken = 'GqJ5aEB9CPpm7rg7cUBxGO';
  const title = 'Camel Detection';
  const body = 'A camel has been detected on the road.';
  const dateSent = new Date().toLocaleString();
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        appId,
        appToken,
        title,
        body,
        dateSent
      })
    });
    
    const responseData = await response.json();
    console.log('Push notification sent successfully:', responseData);
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
}

sendPushNotification();


export default async function handler(req, res) {
  try {

    await sendPushNotification();
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



