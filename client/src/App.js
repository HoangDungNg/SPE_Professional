import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import SpeOne from "./Components/Pages/SpeOne";
import NavBar from "./Components/NavBar/NavBar";
import SpeTwo from "./Components/Pages/SpeTwo";
import Login from "./Components/Login";
import { UserContext } from './context/UserContext';
import { useContext, useEffect } from "react";
import Content from "./Components/Content";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const { user } = useContext(UserContext);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log(isLoggedIn);
  // var isLoggedIn = true;

  const welcomeUser = (userName, toastHandler = toast) => {
    toastHandler.success(
      `Welcome,  ${userName}!`,
    {
      icon: '👋',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    })
  }

  useEffect(() => {
    if(!user.auth) return;

      (() => {
        welcomeUser(user.name);
      })()
    
  }, [user.auth])
  

  return (
    user.auth ?
    <div className="App flex flex-row font-['Montserrat'] bg-[#E6ECEF]">
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/spe1" element={<SpeOne />} />
          <Route path="/spe2" element={<SpeTwo />} />
        </Routes>
        
      </BrowserRouter>
      <Toaster position="bottom-center" reverse={false} />
    </div>
    : (
      <Login />
    )
  );
}

export default App;
