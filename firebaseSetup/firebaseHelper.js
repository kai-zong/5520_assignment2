import {db} from './firebaseSetup';

import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

export async function getItems(collectionName) {
    try{
          const querySnapshot = await getDocs(collection(db, collectionName));
          const items = [];
          querySnapshot.forEach((doc) => {
                 items.push({id: doc.id, ...doc.data()});
          });
          return items;
    }
     catch(err){
             console.error(err);
     }
}

export async function addItem(collectionName, item) {
    try{
         await addDoc(collection(db, collectionName), item);
    }
    catch(err){
          console.error(err);
    }
}


export async function updateItem(collectionName, item) {
    try{
         const itemRef = doc(db, collectionName, item.id);
         await updateDoc(itemRef, item);
    }
    catch(err){
          console.error(err);
    }
}

export async function deleteItem(collectionName, id) {
    try{
         await deleteDoc(doc(db, collectionName, id));
    }
    catch(err){
          console.error(err);
    }
}
