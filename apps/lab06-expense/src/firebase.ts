import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
apiKey: "AIzaSyDtiRS_KP6V21oK-tT2ALEiAFo0YDfj8FI",
authDomain: "lab06-expense-47dec.firebaseapp.com",
projectId: "lab06-expense-47dec",
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
