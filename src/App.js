
import './App.scss';
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Navigate,
  Routes
} from "react-router-dom";

function App() {
  const {currentUser}=useContext(AuthContext)
  const ProtectedRoute=({children})=>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children;
  }
  return (
    <div>
      <BrowserRouter>

      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>

        </Route>
      </Routes>
      </BrowserRouter>
     
  
    </div>
  
  );
}

export default App;
