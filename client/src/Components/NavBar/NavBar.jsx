import React, { useEffect, useState } from 'react'
// import { UserContext } from '../../context/UserContext'
import { svgIcons } from '../../js/svgIcons'
import NavButton from './NavButton'
import { useDispatch } from 'react-redux';
import { auth, db } from '../../firebase';
import { logout } from "../../features/userSlice"
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';


function NavBar() {

  // const { user, logout } = useContext(UserContext);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({name: '', email: '', role: ''});

  useEffect(() => {
    try{
      db.collection("users").doc(user.uid).get()
      .then((doc) => {
        if(doc.exists){

          const emailData = doc.data().email;
          const nameData = doc.data().name;
          const roleData = doc.data().role;

          setUserDetails({name: nameData, email: emailData, role: roleData})
        }
      })
    }
    catch(err){
      console.log(err)
    }
    
    
  }, [])
  

  const logoutofPortal = (e) => {
    dispatch(logout());
    auth.signOut();
  }

  return (
    <div id="sideNav" className="flex flex-[20] flex-col justify-between h-screen bg-white border-r w-80">
      <div className="px-4 py-6">
        <img 
          src="https://pbs.twimg.com/profile_images/1387990771291148290/sRyAuuCS_400x400.jpg" 
          alt="Murdoch logo" 
          className="object-cover w-24 h-24 rounded-full mx-auto"
         />
    
        <div className="px-5 pt-5 font-bold">Welcome, {userDetails.name}!</div>

        <nav className="flex flex-col mt-6 space-y-1">
          <NavButton link={"/"} icon={svgIcons[0].homeIcon} text={svgIcons[0].homeText} />
    
          { 
            //When it is student, they can only see SPE forms, cannot see units with other groups
            userDetails.role === 'student' ? null :
            <details className="group">
              <summary id="groupBtn" className="flex items-center px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
                {svgIcons[1].groupCatIcon} {svgIcons[1].groupCatText} {svgIcons[1].groupCatDropDownIcon}
              </summary>
      
              <nav className="mt-1.5 ml-8 flex flex-col">
                <NavButton  link={"/group1"} icon={svgIcons[2].groupIcon} text={svgIcons[2].groupText1} />
                <NavButton  link={"/group2"} icon={svgIcons[2].groupIcon} text={svgIcons[2].groupText2} />
              </nav>
            </details>
          }
          
          {/* Place another details of other units here eg. <details>ICT123</details> with the copy of above code*/}
          {/* Get the units from database */}

          {
            //When it is lecturer, they can only see units, SPE forms on nav bar cannot be seen
            userDetails.role === 'lecturer' ? null : 
            <div>
              <NavButton  link={"/spe1"} icon={svgIcons[3].speIcon} text={svgIcons[3].speText1} />
              <NavButton  link={"/spe2"} icon={svgIcons[3].speIcon} text={svgIcons[3].speText2} />
            </div>
          }

          <details className="group">
            <summary id="accountBtn" className="flex items-center px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
              {svgIcons[4].accountIcon} {svgIcons[4].accountText} {svgIcons[4].accountDropDownIcon}
            </summary>
    
            <nav className="mt-1.5 ml-8 flex flex-col">
              <NavButton  link={"/details"} icon={svgIcons[5].detailsIcon} text={svgIcons[5].detailsText} />

              <form action="/" onSubmit={logoutofPortal}>
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
        <a href="/#" className="flex items-center p-4 bg-white hover:bg-gray-50 shrink-0">
          <img className="object-cover w-10 h-10 rounded-full" src="https://www.hyperui.dev/photos/man-4.jpeg" alt="jingwei" />
    
          <div className="ml-1.5 text-left">
            <p className="text-xs">
              <strong className="block font-semibold">{userDetails.name}</strong>
    
              <span> {user.email} </span>
            </p>
          </div>
        </a>
      </div>
    </div>
  )
}

export default NavBar