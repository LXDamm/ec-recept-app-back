import admin from 'firebase-admin';
import serviceAccount from '../../recept-key.json';

admin.initializeApp({credential: admin.credential.cert(serviceAccount)});

export default admin;