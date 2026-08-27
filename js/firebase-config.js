// ===== firebase-config.js =====
// Initializes Firebase (Firestore only — we don't use Firebase Hosting or Auth).
// Loaded as a <script type="module"> — see create.html / wish.html.
//
// SECURITY NOTE: This apiKey is safe to expose in frontend code — Firebase
// web API keys are not secret, they just identify the project. Real security
// comes from Firestore Rules (server-side), which we will tighten before
// going live (currently in "test mode" — open read/write, fine for dev only).

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQ3oIDD3lrZxt7muYasLhhTGWPlponjkY",
  authDomain: "wishmaker-eba98.firebaseapp.com",
  projectId: "wishmaker-eba98",
  storageBucket: "wishmaker-eba98.firebasestorage.app",
  messagingSenderId: "965630286732",
  appId: "1:965630286732:web:93622e755e89cf4e86d4a9",
  measurementId: "G-H5RL1Q1KRN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Saves a new wish request to Firestore and returns its auto-generated ID.
 * Called by create.js after the video has been rendered and uploaded.
 *
 * @param {Object} wishData - { theme, designId, name, musicId, photoUrl, videoUrl, timestamp }
 * @returns {Promise<string>} the new document's ID (used as ?id= in wish.html)
 */
export async function saveWish(wishData) {
  const docRef = await addDoc(collection(db, "wishes"), {
    ...wishData,
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

/**
 * Fetches a wish by its Firestore document ID.
 * Called by wish.js when the page loads with ?id=...
 *
 * @param {string} wishId
 * @returns {Promise<Object|null>} the wish data, or null if not found
 */
export async function getWish(wishId) {
  const docRef = doc(db, "wishes", wishId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}
