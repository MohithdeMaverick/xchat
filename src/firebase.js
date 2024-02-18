import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
import {getFirestore} from "firebase/firestore"



const firebaseConfig = {
  apiKey: "AIzaSyCLzAuRnuuaDh68tm024k5QLzjhbD2BHRo",
  authDomain: "realtimechat-553ab.firebaseapp.com",
  projectId: "realtimechat-553ab",
  storageBucket: "realtimechat-553ab.appspot.com",
  messagingSenderId: "365626694415",
  appId: "1:365626694415:web:d4783bf26da05617827c7a"
};

export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage = getStorage();
export const db =getFirestore()
