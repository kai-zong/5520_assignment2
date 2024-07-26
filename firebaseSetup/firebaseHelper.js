import {db} from './firebaseConfig';

import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

export async function getActivities() {
   try{
        const querySnapshot = await getDocs(collection(db, "activities"));
        const activities = [];
        querySnapshot.forEach((doc) => {
             activities.push({id: doc.id, ...doc.data()});
        });
        return activities;
   }
    catch(err){
          console.error(err);
    }
}

export async function addActivity(activity) {
    try{
         await addDoc(collection(db, "activities"), activity);
    }
    catch(err){
          console.error(err);
    }
}

export async function updateActivity(activity) {
    try{
         const activityRef = doc(db, "activities", activity.id);
         await updateDoc(activityRef, activity);
    }
    catch(err){
          console.error(err);
    }
}

export async function deleteActivity(id) {
    try{
         await deleteDoc(doc(db, "activities", id));
    }
    catch(err){
          console.error(err);
    }
}

export async function getDiets() {
   try{
        const querySnapshot = await getDocs(collection(db, "diets"));
        const diets = [];
        querySnapshot.forEach((doc) => {
             diets.push({id: doc.id, ...doc.data()});
        });
        return diets;
   }
    catch(err){
          console.error(err);
    }
}

export async function addDiet(diet) {
    try{
         await addDoc(collection(db, "diets"), diet);
    }
    catch(err){
          console.error(err);
    }
}

export async function updateDiet(diet) {
    try{
         const dietRef = doc(db, "diets", diet.id);
         await updateDoc(dietRef, diet);
    }
    catch(err){
          console.error(err);
    }
}

export async function deleteDiet(id) {
    try{
         await deleteDoc(doc(db, "diets", id));
    }
    catch(err){
          console.error(err);
    }
}