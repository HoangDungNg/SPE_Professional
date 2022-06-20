import React, { useEffect, useState } from "react";
// import { UserContext } from '../../context/UserContext'
import { svgIcons } from "../../js/svgIcons";
import NavButton from "./NavButton";
import { useDispatch } from "react-redux";
import { auth, db } from "../../firebase";
import { logout } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { Avatar } from "@mui/material";
import { GiBookshelf, GiConsoleController } from "react-icons/gi";
import { AiOutlineEdit } from "react-icons/ai";

function NavBar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState("");
  const [unitGroup, setUnitGroup] = useState([]);
  const [units, setUnits] = useState([]);

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

  //UseEffect for getting the module groups under the specified unit
  useEffect(() => {
    try {
      db.collection("unit")
        .doc("ICT302")
        .get()
        .then((doc) => {
          if (doc.exists) {
            const groupData = doc.data().group;
            groupData.map((group) =>
              setUnitGroup((unitGroup) => [...unitGroup, group.groupNumber])
            );
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  //Newly added code 18/6/22 for setting the unit and classes on navigation
  useEffect(() => {
    if (!userDetails) return;

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
              // console.log(unit)

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
  }, [userDetails]);

  //Function for logging out of the portal and firebase authentication using redux
  const logoutofPortal = (e) => {
    window.location.href = "/"; //Change the url to root path before logout
    dispatch(logout());
    auth.signOut();
  };

  return (
    <div
      id="sideNav"
      className="flex flex-[20] flex-col justify-between h-screen bg-white border-r w-80"
    >
      <div className="px-4 py-6">
        <img
          src="https://pbs.twimg.com/profile_images/1387990771291148290/sRyAuuCS_400x400.jpg"
          alt="Murdoch logo"
          className="object-cover w-24 h-24 rounded-full mx-auto"
        />

        <div className="px-5 pt-5 font-bold">Welcome, {userDetails.name}!</div>

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
                    {svgIcons[3].speIcon}
                    <span className="ml-3 text-sm font-medium">
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
                        <NavButton
                          key={index}
                          link={`/group/${index + 1}`}
                          icon={svgIcons[2].groupIcon}
                          text={eachClass}
                        />
                      ))}
                    </nav>
                  </details>

                  //Old code
                  // <details className="group">
                  //   <summary id="groupBtn" className="flex items-center px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
                  //     {svgIcons[1].groupCatIcon} <span className="ml-3 text-sm font-medium">ICT123</span> {svgIcons[1].groupCatDropDownIcon}
                  //   </summary>

                  //   <nav className="mt-1.5 ml-8 flex flex-col">
                  //     {
                  //       unitGroup.map((group, index) => {
                  //         return (
                  //           <NavButton key={index} link={`/group/${index+1}`} icon={svgIcons[2].groupIcon} text={`Group ${group}`} />
                  //         )
                  //       })
                  //     }
                  //   </nav>
                  // </details>
                ))
          }

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
            //Navigation buttons for addSPE1 and addSPE2
            userDetails.role === "student" ? null : (
              <details className="group">
                <summary
                  id="formBtn"
                  className="flex items-center px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700"
                >
                  {svgIcons[7].formIcon} {svgIcons[7].formText}{" "}
                  {svgIcons[1].groupCatDropDownIcon}
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
                link={"/details"}
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

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <a
          href="/#"
          className="flex items-center p-4 bg-white hover:bg-gray-50 shrink-0"
        >
          <Avatar src={userDetails.photoUrl}>
            {user.email[0].toUpperCase()}
          </Avatar>

          <div className="ml-1.5 text-left">
            <p className="text-xs">
              <strong className="block font-semibold">
                {userDetails.name}
              </strong>
              <span> {user.email} </span>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default NavBar;
