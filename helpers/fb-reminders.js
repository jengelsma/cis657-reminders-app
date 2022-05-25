import { getDatabase, onValue, ref, set } from "firebase/database";

import { firebaseConfig } from "./fb-credentials";
import { initializeApp } from "firebase/app";

export function initRemindersDB() {
  initializeApp(firebaseConfig);
}   

export function writeData(key, data) {
  const db = getDatabase();
  const reference = ref(db,`reminderData/${key}`);
  set(reference, data);
}

export function setupDataListener(key) {
  console.log("setDataListener called");
  const db = getDatabase();
  const reference = ref(db, `reminderData/${key}`);
  onValue(reference, (snapshot) => {
      console.log("data listener fires up with: ", snapshot);
  }); 
}

