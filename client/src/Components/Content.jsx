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
import { useEffect, useState } from "react";
import { db } from '../firebase';
import Group from "./Pages/Group";
import AddSPE1 from "./Pages/AddSPE1";
import AddSPE2 from "./Pages/AddSPE2";
import RegisterUnit from "./Pages/RegisterUnit";
import RegisterTeam from "./Pages/RegisterTeam";
import SPEOne from "../Components/Pages/SpeOne";
import Class from "./Pages/Class";
import RegisterStud from "./Pages/RegisterStud";
import UpdateTeam from "./Pages/UpdateTeam";
import RegisterLect from "./Pages/RegisterLect";
import UserDetails from "./Pages/UserDetails";

function Content() {
  const user = useSelector(selectUser);
  const [unitGroupName, setUnitGroupName] = useState([])
  const [unitGroupNum, setUnitGroupNum] = useState([])
  const [unitGroup, setUnitGroup] = useState([])
  const [members, setMembers] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [attendingUnits, setAttendingUnits] = useState("");

  //Welcome toast
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

  //Get the current logged in user from firebase and send a welcome toast message
  useEffect(() => {
    if (!user) return;

    try{
      db.collection("users").doc(user.uid).get()
      .then((doc) => {
        if(doc.exists){
          const nameData = doc.data().name;
          const attendingUnits = doc.data().attendingUnits;
          setAttendingUnits(attendingUnits);
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

   useEffect(() => {
    if(!members) return;
    try {
      members.map((member) => {
        return db.collection("users")
          .doc(member.id)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setUserInfo((userInfo) => [...userInfo, doc.data()]);
            }
          });
      });
    }
    catch(err){
      console.log(err)
    }
  }, [members]);

  return (
    <div className="app_body h-screen overflow-hidden">
      <div className="flex flex-col bg-black text-white h-12 items-center justify-center">
        <img src="https://myinfo.murdoch.edu.au/app_content/gen2/customer_override/static/web_style/student-default/mymurdoch.png" alt="" />
      </div>
      <div className="flex flex-row font-['Montserrat'] bg-[#E6ECEF]">
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/spe1">
            <Route path=":spe1UnitCode" element={<SPEOne attendingUnits={attendingUnits} />} />  
          </Route>
          <Route path="/spe2">
            <Route path=":spe2UnitCode" element={<SpeTwo />} /> 
          </Route>         
          <Route path="/registerLect" element={<RegisterLect />} />
          <Route path="/registerStud" element={<RegisterStud />} />
          <Route path="/registerUnit" element={<RegisterUnit />} />
          <Route path="/registerTeam" element={<RegisterTeam />} />
          <Route path="/updateTeam" element={<UpdateTeam />} />
          <Route path="/addSPE1" element={<AddSPE1 />} />
          <Route path="/addSPE2" element={<AddSPE2 />} />
          <Route path="/class"> 
            <Route path=":classId" element={<Class userInfo={userInfo} groupName={unitGroupName} groupNum={unitGroupNum} />} /> 
          </Route>    
          <Route path="/class/:unitId/:classId" element={<Class userInfo={userInfo} groupName={unitGroupName} groupNum={unitGroupNum} />} />
          <Route path="/userDetails" element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-center" reverse={false} />
    </div>
    </div>
  );
}

export default Content;
