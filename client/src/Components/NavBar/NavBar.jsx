import React, { useEffect, useState } from "react";
// import { UserContext } from '../../context/UserContext'
import firebase from "firebase/compat/app";
import { svgIcons } from "../../js/svgIcons";
import NavButton from "./NavButton";
import { useDispatch } from "react-redux";
import { auth, db } from "../../firebase";
import { logout } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { Avatar } from "@mui/material";
import { GiBookshelf } from "react-icons/gi";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

function NavBar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState("");
  const [units, setUnits] = useState([]);
  const [screenSize, setScreenSize] = useState("");
  const [open, setOpen] = useState(true);
  const [mobileScreen, setMobileScreen] = useState(false);
  const currentUser = firebase.auth().currentUser;

  // console.log(currentUser)

  //UseEffect for getting user's email, name, role and photoUrl from firebase
  useEffect(() => {
    try {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const emailData = doc.data().email;
            const nameData = doc.data().name;
            const roleData = doc.data().role;
            const photoUrl = doc.data().photoUrl;
            const attendingUnits = doc.data().attendingUnits;

            setUserDetails({
              name: nameData,
              email: emailData,
              role: roleData,
              photoUrl: photoUrl,
              attendingUnits: attendingUnits,
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  //Newly added code 18/6/22 for setting the unit and classes on navigation
  useEffect(() => {
    if (!userDetails) return;

    //If user is admin only allow admin to add users and unit, update users
    if(userDetails.role !== 'admin'){
      try {
        userDetails.attendingUnits.forEach((unit) => {
          db.collection("module")
            .where("unitCode", "==", unit)
            .where("trimesterCode", "==", "TMA2022")
            .get()
            .then((snapshot) => {
              const data = snapshot.docs.map((doc) => doc.data());
              // console.log(data);
              data.forEach((unit) => {

                setUnits((navUnit) => [
                  ...navUnit,
                  {
                    unitCode: unit.unitCode,
                    classCode: unit.classes,
                    trimesterCode: unit.trimesterCode,
                  },
                ]);
              });
            });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [userDetails]);

  //Function for logging out of the portal and firebase authentication using redux
  const logoutofPortal = (e) => {
    window.location.href = "/"; //Change the url to root path before logout
    dispatch(logout());
    auth.signOut();
  };

  useEffect(() => {

    //Check the device accessed to the portal is mobile device
    if (window.innerWidth <= 820) {
      console.log("check width");
      setOpen(false);
      setMobileScreen(true);
    }

    function handleResize() {
      if (window.innerWidth <= 820) {
        console.log("check width");
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
    <div>
      {mobileScreen ? (
        !open ? (
          <div className="bg-[#E12945] h-10 w-10 flex justify-center items-center font-bold duration-500" onClick={() => setOpen(true)}>
            <span className="text-xl">&#9776;</span>
          </div>
        ) : (
          <div className="w-screen duration-500">
            <div className="text-6xl flex justify-end" onClick={() => setOpen(false)}>
              <span className="flex justify-center items-center">&times;</span>
              
            </div>
            <div className="px-4 pt-6 pb-32 mb-10 overflow-auto scrollbar h-screen duration-500">
              <img
                src="https://pbs.twimg.com/profile_images/1387990771291148290/sRyAuuCS_400x400.jpg"
                alt="Murdoch logo"
                className="object-cover w-24 h-24 rounded-full mx-auto"
              />

              <div className="px-5 pt-5 font-bold">
                Welcome, {currentUser.name}!
              </div>

              <nav className="flex flex-col mt-6 space-y-1">
                <NavButton
                  link={"/"}
                  icon={svgIcons[0].homeIcon}
                  text={svgIcons[0].homeText}
                  handleClick={() => setOpen(false)}
                />
                {console.log(units)}
                {
                  
                  units &&
                    units.map((unit, index) => (
                      <details className="group" key={index}>
                        <summary
                          id="groupBtn"
                          className="flex items-center px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700"
                        >
                          <div>{svgIcons[3].speIcon}</div>

                          <span className="ml-3 text-sm font-medium text-left">
                            Self & Peer Evaluation for {unit.unitCode}
                          </span>
                          {svgIcons[1].groupCatDropDownIcon}
                        </summary>

                        <nav className="mt-1.5 ml-8 flex flex-col">
                          <NavButton
                            link={`/spe1/${unit.unitCode}`}
                            icon={svgIcons[3].speIcon}
                            text={`Self & Peer Evaluation 1`}
                            handleClick={() => setOpen(false)}
                          />
                          <NavButton
                            link={`/spe2/${unit.unitCode}`}
                            icon={svgIcons[3].speIcon}
                            text={`Self & Peer Evaluation 2`}
                            handleClick={() => setOpen(false)}
                          />
                        </nav>
                      </details>
                    ))
                }
                {
                  //SHOW UNIT AND CLASSES OF UNIT
                  //When it is student, they can only see SPE forms, cannot see units with other groups
                  userDetails.role === "student"
                    ? null
                    : units.map((unit, index) => (
                        <details className="group" key={index}>
                          <summary
                            id="groupBtn"
                            className="flex items-center px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700"
                          >
                            <GiBookshelf size={20} color="#9B9FA9" />
                            <span className="ml-3 text-sm font-medium">
                              {unit.unitCode}
                            </span>
                            {svgIcons[1].groupCatDropDownIcon}
                          </summary>

                          <nav className="mt-1.5 ml-8 flex flex-col">
                            {unit.classCode.map((eachClass, index) => (
                              // console.log(`/${unit.unitCode}/${eachClass}`)
                              <NavButton
                                key={index}
                                // link={`/class/${index + 1}`}
                                link={`/class/${unit.unitCode}/${eachClass}`}
                                icon={svgIcons[2].groupIcon}
                                text={eachClass}
                                handleClick={() => setOpen(false)}
                              />
                            ))}
                          </nav>
                        </details>
                      ))
                }

                {userDetails.role === "admin" ? (
                  <NavButton
                    link={"/registerStud"}
                    icon={<AiOutlineEdit size={20} color="#9B9FA9" />}
                    text={"Add/Update student info"}
                    handleClick={() => setOpen(false)}
                  />
                ) : null}

                {
                  //Navigation button for Register units
                  userDetails.role === "student" ? null : (
                    <NavButton
                      link={"/registerUnit"}
                      icon={<AiOutlineEdit size={20} color="#9B9FA9" />}
                      text={"Register/Update units"}
                      handleClick={() => setOpen(false)}
                    />
                  )
                }

                {
                  //Navigation button for Register teams
                  <NavButton
                    link={"/registerTeam"}
                    icon={<AiOutlineEdit size={20} color="#9B9FA9" />}
                    text={"Register/Update teams"}
                    handleClick={() => setOpen(false)}
                  />
                }

                {

                  <NavButton
                    link={"/updateTeam"}
                    icon={<AiOutlineEdit size={20} color="#9B9FA9" />}
                    text={"Update team info"}
                    handleClick={() => setOpen(false)}
                  />
                }

                {
                  //Navigation buttons for addSPE1 and addSPE2
                  userDetails.role === "student" ? null : (
                    <details className="group">
                      <summary
                        id="formBtn"
                        className="flex items-center px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700"
                      >
                        <div>{svgIcons[7].formIcon}</div>
                        {svgIcons[7].formText}{" "}
                        {svgIcons[1].groupCatDropDownIcon}
                      </summary>
                      <nav className="mt-1.5 ml-8 flex flex-col">
                        <NavButton
                          link={"/addSPE1"}
                          icon={svgIcons[3].speIcon}
                          text={"Add/Update SPE 1 Form"}
                          handleClick={() => setOpen(false)}
                        />
                        <NavButton
                          link={"/addSPE2"}
                          icon={svgIcons[3].speIcon}
                          text={"Add/Update SPE 2 Form"}
                          handleClick={() => setOpen(false)}
                        />
                      </nav>
                    </details>
                  )
                }

                <details className="group">
                  <summary
                    id="accountBtn"
                    className="flex items-center px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700"
                  >
                    {svgIcons[4].accountIcon} {svgIcons[4].accountText}{" "}
                    {svgIcons[4].accountDropDownIcon}
                  </summary>

                  <nav className="mt-1.5 ml-8 flex flex-col">
                    <NavButton
                      link={"/userDetails"}
                      icon={svgIcons[5].detailsIcon}
                      text={svgIcons[5].detailsText}
                      handleClick={() => setOpen(false)}
                    />

                    <form onSubmit={logoutofPortal}>
                      <button
                        type="submit"
                        id="logoutBtn"
                        className="flex items-center w-full px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                        // onClick={logoutofPortal}
                      >
                        {svgIcons[6].logoutIcon} {svgIcons[6].logoutText}
                      </button>
                    </form>
                  </nav>
                </details>
              </nav>
            </div>
          </div>
        )
      ) : (
        <div
          id="sideNav"
          className="flex flex[20] flex-col justify-between h-screen bg-white border-r w-80"
        >
          <div className="px-4 py-6 overflow-auto mb-10 scrollbar">
            <img
              src="https://pbs.twimg.com/profile_images/1387990771291148290/sRyAuuCS_400x400.jpg"
              alt="Murdoch logo"
              className="object-cover w-24 h-24 rounded-full mx-auto"
            />

            <div className="px-5 pt-5 font-bold">
              Welcome, {userDetails.name}!
            </div>

            <nav className="flex flex-col mt-6 space-y-1">
              <NavButton
                link={"/"}
                icon={svgIcons[0].homeIcon}
                text={svgIcons[0].homeText}
              />

              {
                //Place another details of other units here eg. <details>ICT123</details> with the copy of below code
                //Get the units from database

                //TODO: add a conditional check whether students finishes the forms, if they finished
                //show only the form they have not finish

                units &&
                  units.map((unit, index) => (
                    <details className="group" key={index}>
                      <summary
                        id="groupBtn"
                        className="flex items-center px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700"
                      >
                        <div>{svgIcons[3].speIcon}</div>

                        <span className="ml-3 text-sm font-medium text-left">
                          Self & Peer Evaluation for {unit.unitCode}
                        </span>
                        {svgIcons[1].groupCatDropDownIcon}
                      </summary>

                      <nav className="mt-1.5 ml-8 flex flex-col">
                        <NavButton
                          link={`/spe1/${unit.unitCode}`}
                          icon={svgIcons[3].speIcon}
                          text={`Self & Peer Evaluation 1`}
                        />
                        <NavButton
                          link={`/spe2/${unit.unitCode}`}
                          icon={svgIcons[3].speIcon}
                          text={`Self & Peer Evaluation 2`}
                        />
                      </nav>
                    </details>
                  ))
              }
              {
                //SHOW UNIT AND CLASSES OF UNIT
                //When it is student, they can only see SPE forms, cannot see units with other groups
                userDetails.role === "student"
                  ? null
                  : units.map((unit, index) => (
                      <details className="group" key={index}>
                        <summary
                          id="groupBtn"
                          className="flex items-center px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700"
                        >
                          <GiBookshelf size={20} color="#9B9FA9" />
                          <span className="ml-3 text-sm font-medium">
                            {unit.unitCode}
                          </span>
                          {svgIcons[1].groupCatDropDownIcon}
                        </summary>

                        {/* {console.log(unit)} */}

                        <nav className="mt-1.5 ml-8 flex flex-col">
                          {unit.classCode.map((eachClass, index) => (
                            // console.log(`/${unit.unitCode}/${eachClass}`)
                            <NavButton
                              key={index}
                              // link={`/class/${index + 1}`}
                              link={`/class/${unit.unitCode}/${eachClass}`}
                              icon={svgIcons[2].groupIcon}
                              text={eachClass}
                            />
                          ))}
                        </nav>
                      </details>
                    ))
              }

              {userDetails.role === "admin" ? (
                <>
                  <NavButton
                    link={"/registerStud"}
                    icon={<AiOutlineEdit size={20} color="#9B9FA9" />}
                    text={"Add/Update student info"}
                  />
                  <NavButton
                    link={"/registerLect"}
                    icon={<AiOutlineEdit size={20} color="#9B9FA9" />}
                    text={"Add/Update lecturer info"}
                  />
                </>
              ) : null}

              {
                //Navigation button for Register units
                userDetails.role === "student" ? null : (
                  <NavButton
                    link={"/registerUnit"}
                    icon={<AiOutlineEdit size={20} color="#9B9FA9" />}
                    text={"Register/Update units"}
                  />
                )
              }

              {
                //Navigation button for Register teams
                <NavButton
                  link={"/registerTeam"}
                  icon={<AiOutlineEdit size={20} color="#9B9FA9" />}
                  text={"Register/Update teams"}
                />
              }

              {
                userDetails.role !== "admin" ?
                <NavButton
                  link={"/updateTeam"}
                  icon={<AiOutlineEdit size={20} color="#9B9FA9" />}
                  text={"Update team info"}
                />
                :
                null
              }

              {
                //Navigation buttons for addSPE1 and addSPE2
                userDetails.role === "student" ? null : (
                  <details className="group">
                    <summary
                      id="formBtn"
                      className="flex items-center px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700"
                    >
                      <div>{svgIcons[7].formIcon}</div>
                      {svgIcons[7].formText} {svgIcons[1].groupCatDropDownIcon}
                    </summary>
                    <nav className="mt-1.5 ml-8 flex flex-col">
                      <NavButton
                        link={"/addSPE1"}
                        icon={svgIcons[3].speIcon}
                        text={"Add/Update SPE 1 Form"}
                      />
                      <NavButton
                        link={"/addSPE2"}
                        icon={svgIcons[3].speIcon}
                        text={"Add/Update SPE 2 Form"}
                      />
                    </nav>
                  </details>
                )
              }

              <details className="group">
                <summary
                  id="accountBtn"
                  className="flex items-center px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700"
                >
                  {svgIcons[4].accountIcon} {svgIcons[4].accountText}{" "}
                  {svgIcons[4].accountDropDownIcon}
                </summary>

                <nav className="mt-1.5 ml-8 flex flex-col">
                  <NavButton
                    link={"/userDetails"}
                    icon={svgIcons[5].detailsIcon}
                    text={svgIcons[5].detailsText}
                  />

                  <form onSubmit={logoutofPortal}>
                    <button
                      type="submit"
                      id="logoutBtn"
                      className="flex items-center w-full px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                      // onClick={logoutofPortal}
                    >
                      {svgIcons[6].logoutIcon} {svgIcons[6].logoutText}
                    </button>
                  </form>
                </nav>
              </details>
            </nav>
          </div>

          <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 mt-2">
            <Link
              to="/userDetails"
              className="flex items-center p-4 bg-white hover:bg-gray-50 shrink-0"
            >
              {currentUser.email && (
                <Avatar src={currentUser?.photoURL}>
                  {currentUser.email[0].toUpperCase()}
                </Avatar>
              )}

              <div className="ml-1.5 text-left">
                <p className="text-xs">
                  <strong className="block font-semibold">
                    {currentUser && currentUser.displayName}
                  </strong>
                  <span>{currentUser && currentUser.email}</span>
                </p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
