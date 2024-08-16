import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Inisialisasi Firebase Admin
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
