import React, { useState,useContext } from 'react';
import { collection, query, where, getDocs,doc ,setDoc,updateDoc,serverTimestamp,getDoc} from 'firebase/firestore';
import { db } from '../firebase';
import {AuthContext} from "../context/AuthContext"

export default function Search() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser }= useContext(AuthContext);
 
  

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where('displayName', '==', username));

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Handle the case when no user is found
        setUser(null);
      } else {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setUser(doc.data());
        });
      }
    } catch (error) {
      // Handle the error, log it, or display an error message to the user
      setErr(error);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  {/*const handleSelect = async () => {
    // Ensure that user is not null before proceeding
    if (!user) {
      console.error("User not selected.");
      return;
    }
  
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
  
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      
      // Use `exists` property to check if the document exists
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
  
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
  
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error('Error creating or updating chat document:', err);
    }
  };*/}
  
  const handleSelect= async () =>{
    const combinedId =
    currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
    try{
    const res=await getDoc(doc(db,"chats",combinedId));
    if(!res.exists()){
      await setDoc(doc(db, "chats", combinedId), { messages: [] });

     await updateDoc(doc(db,"userChats",currentUser.uid),{
      [combinedId+".userInfo"]:{
        uid:user.uid,
        displayName:user.displayName,
        photoURL:user.photoURL,

      },[combinedId + ".date"]: serverTimestamp(),
     });

     await updateDoc(doc(db,"userChats",user.uid),{
      [combinedId+".userInfo"]:{
        uid:currentUser.uid,
        displayName:currentUser.displayName,
        photoURL:currentUser.photoURL

      },[combinedId+".date"]:serverTimestamp()
     });
    }
    }catch (err){

    }
    setUser(null);
    setUsername("")


  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
  
}
