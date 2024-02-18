import React from 'react'
import {useNavigate,Link} from "react-router-dom"
import  {useState} from "react"
import {  getAuth,signInWithEmailAndPassword } from "firebase/auth";



const Login= () => {
  const auth=getAuth();
  const [err, setErr] = useState(false);
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    
           e.preventDefault()

    
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");


    }catch (err) {
      console.error(err);
      setErr(true);
    }
  }
  

  return (
    <div className='formContainer'>
         <div className='formWrapper'>
            <span className="logo">X Chat</span>
            <span className="title">Login</span>
            <form onSubmit={handleSubmit}>
                
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="password"/>
                
                <button>Sign-in</button>
                {err && <span class="error">Something went wrong</span>}
            </form>
            <p>You do have an account? <Link to="/register">Register</Link></p>
         </div>
    </div>
  )
}

export default Login