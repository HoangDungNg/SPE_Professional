// import React, { useEffect, useState } from "react";
// import Card from "./Card/Card";
// import Home from "./Home";
// import NavBar from "./NavBar/NavBar";
import SpeOne from "../Components/Pages/SpeOne";
import NavBar from "../Components/NavBar/NavBar";
import SpeTwo from "../Components/Pages/SpeTwo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import toast, { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import { useEffect } from "react";
import { db } from '../firebase';
import Group1 from "./Pages/Group1";

function Content() {
  // const [login, setLogin] = useState(false);
  // const [data, setData] = useState({username:'', role:''});
  const user = useSelector(selectUser);
  // const dispatch = useDispatch();
  // const [userDetails, setUserDetails] = useState({name: '', email: '', role: ''});

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
    if (!user) return;

    try{
      db.collection("users").doc(user.uid).get()
      .then((doc) => {
        if(doc.exists){
          const nameData = doc.data().name;
          return nameData
        }
      }).then((nameData) => {
        welcomeUser(nameData);
    })
    }
    catch(err){
      console.log(err)
    }
  }, []);
  return (
    // <div className="content flex flex-[80] h-screen justify-center overflow-auto">

    // </div>

    <div className="app_body flex flex-row font-['Montserrat'] bg-[#E6ECEF]">
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/spe1" element={<SpeOne />} />
          <Route path="/spe2" element={<SpeTwo />} />
          <Route path="/group1" element={<Group1 />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-center" reverse={false} />
    </div>
  );
}

export default Content;
