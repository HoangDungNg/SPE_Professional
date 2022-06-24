import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../firebase";
import HomeSection from "../HomeComponents/HomeSection";
// import Content from './Content';
// import Login from './Login';
// import NavBar from './NavBar/NavBar';
// import { SPE1Questions, SPE2Questions } from '../js/list'

function Home() {
  //homepage: './' for package.json
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log(isLoggedIn);
  // var isLoggedIn = true;
  const [userDetails, setUserDetails] = useState("");
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user.uid) return;

    try {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();

            const emailData = data.email;
            const nameData = data.name;
            const roleData = data.role;
            const photoUrl = data.photoUrl;
            const attendingUnits = data.attendingUnits;

            setUserDetails({
              name: nameData,
              email: emailData,
              role: roleData,
              photoUrl: photoUrl,
              attendingUnits: attendingUnits,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="flex flex-[80] h-screen justify-center">
      <div className="flex flex-col w-full">
        <div className="flex pl-10 justify-center items-center bg-[#E12945] h-16 text-white">
          <h2>Home</h2>
        </div>
        {
          //If user logged in is student only allow them to see the control section
          //If user logged in is lecturer or admin allow them to see every section
          // userDetails && userDetails.role === "student" ? (
          //   <HomeSection
          //     title={"Control"}
          //     userRole={userDetails.role}
          //     attendingUnits={userDetails.attendingUnits}
          //   />
          // ) 
          // :
           (
            <>
              <HomeSection title={"Home"} userRole={userDetails.role} attendingUnits={userDetails.attendingUnits} />
              {/* <HomeSection title={"Control"} attendingUnits={userDetails.attendingUnits} /> */}
              {/* <HomeSection title={"Dashboard"} /> */}
              {/* <HomeSection title={"Output"} /> */}
            </>
          )
        }
      </div>
    </div>

    // !isLoggedIn ? <Login />
    // :
    // <div className='flex flex-row items-center'>
    //   <div className='flex flex-[80] h-screen justify-center overflow-auto'>
    //     <h1>home page</h1>
    //   </div>
    // </div>
  );
}

export default Home;
