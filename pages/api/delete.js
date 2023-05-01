import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { database } from '../../database/firebase.js';

export default async function handler(req, res) {
  try {
    const notificationsCollection = collection(database, 'notifications');
    const notificationsSnapshot = await getDocs(notificationsCollection);
    const batch = database.batch();

    notificationsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    res.status(200).json({ message: 'Notifications deleted successfully' });
  } catch (error) {
    console.error('Error deleting notifications: ', error);
    res.status(500).json({ message: 'Server error' });
  }
}
