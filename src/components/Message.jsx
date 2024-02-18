import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";


const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  const formattedTime = message.date?.toLocaleString();

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{formattedTime }</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;

{/*const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    if (message) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  // Check if message is undefined or null
  if (!message) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" onError={() => console.error("Image not found")} />}
      </div>
    </div>
  );
};

export default Message;*/}



{/*import React,{useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from "../context/ChatContext";*/}


{/*export default function Message({message}) {
  const {currentUser}=useContext(AuthContext)
  const { data } = useContext(ChatContext);
  return (
    <div className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
      <img src={message.senderId===currentUser.uid?currentUser.photoURL:data.user.photoURL} alt=""/>
      <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}

  </div>
    </div>
  )
}*/}
