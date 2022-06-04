// import React, { useState } from 'react'
// import Content from './Content';
// import Login from './Login';
// import NavBar from './NavBar/NavBar';
// import { SPE1Questions, SPE2Questions } from '../js/list'

function Home() {
  //homepage: './' for package.json
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log(isLoggedIn);
  // var isLoggedIn = true;
  return (
    <div className="flex flex-[80] h-screen justify-center overflow-auto">
      <h1>Home page</h1>
    </div>
    // !isLoggedIn ? <Login />
    // :
    // <div className='flex flex-row items-center'>
    //   <div className='flex flex-[80] h-screen justify-center overflow-auto'>
    //     <h1>home page</h1>
    //   </div>
    // </div>
  )
}

export default Home