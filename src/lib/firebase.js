import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDiMWE8rmUz1CXbQBL2K48GREtxEbgJ3W0",
    authDomain: "bendooo-sutom.firebaseapp.com",
    databaseURL: "https://bendooo-sutom-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bendooo-sutom",
    storageBucket: "bendooo-sutom.appspot.com",
    messagingSenderId: "57646938099",
    appId: "1:57646938099:web:3ef60380630f84ece58486"
};
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
