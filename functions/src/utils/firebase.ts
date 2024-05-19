import { firestore } from 'firebase-admin';
const admin = require('firebase-admin');

import devConfig from './serviceAccounts/firebase-dev';
import prodConfig from './serviceAccounts/firebase-prod';

const config = process.env.NODE_ENV === 'production' ? prodConfig : prodConfig;

admin.initializeApp({
  credential: admin.credential.cert(config),
});

const db = firestore();
const adminauth = admin.auth();

export { db, adminauth };
