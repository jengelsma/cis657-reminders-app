import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";

import { firebaseConfig } from "./fb-credentials";
import { initializeApp } from "firebase/app";

export function initRemindersDB() {
  initializeApp(firebaseConfig);
}   

// export function writeData(key, data) {
//   const db = getDatabase();
//   const reference = ref(db,`reminderData/${key}`);
//   set(reference, data);
// }
export function storeReminderItem(item) {
  //firebase.database().ref("reminderData/").push(item);
    const db = getDatabase();
    const reference = ref(db,'reminderData/');
    push(reference, item);
}

export function setupReminderListener(updateFunc) {
  const db = getDatabase();
  const reference = ref(db, "reminderData/");
  onValue(reference, (snapshot) => {
    console.log("setupReminderListener fires up with: ", snapshot);
    if (snapshot?.val()) {
      const fbObject = snapshot.val();
      const newArr = [];
      Object.keys(fbObject).map((key, index) => {
        console.log(key, "||", index, "||", fbObject[key]);
        newArr.push({ ...fbObject[key], id: key });
      });
      updateFunc(newArr);
    } else {
      updateFunc([]);
    }
  });
} 

export function updateReminder(item) {
  const key = item.id;
  delete item.id;
  const db = getDatabase();
  const reference = ref(db,`reminderData/${key}`);
  set(reference, item);
}

export function deleteReminder(item) {
  const db = getDatabase();
  const reference = ref(db, `reminderData/${item.id}`);
  remove(reference);
}

