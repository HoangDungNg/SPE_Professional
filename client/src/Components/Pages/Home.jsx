import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../firebase";
import HomeSection from "../HomeComponents/HomeSection";

function Home() {
  const [userDetails, setUserDetails] = useState("");
  const user = useSelector(selectUser);
  const [screenSize, setScreenSize] = useState("");
  const [open, setOpen] = useState(true);
  const [mobileScreen, setMobileScreen] = useState(false);

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

  useEffect(() => {

    //Check the device accessed to the portal is mobile device
    if (window.innerWidth <= 768) {
      setOpen(false);
      setMobileScreen(true);
    }

    function handleResize() {
      if (window.innerWidth <= 768) {
        setOpen(false);
        setMobileScreen(true);
      } else {
        setOpen(true);
        setMobileScreen(false);
      }

      setScreenSize(window.innerWidth);
 
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

  return (
    <div className="flex flex-[80] h-screen justify-center">
      <div className="flex flex-col w-full">
        <div className="flex justify-center w-full items-center bg-[#E12945] h-10 p-2 text-white sticky top-0">
          <h2>Home</h2>
        </div>
        {
          <>
            <HomeSection userRole={userDetails.role} attendingUnits={userDetails.attendingUnits} />
          </>
        }
      </div>
    </div>
  );
}

export default Home;
