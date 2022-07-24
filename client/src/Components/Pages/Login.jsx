import React, { useState } from "react";
// import { UserContext } from "../context/UserContext";
import { login } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { auth, db } from "../../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  async function handleSignIn(e) {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoUrl: userAuth.user.photoURL,
          })
        );
      })
      .catch((error) => alert("Email or password is incorrect, please try again."));
  }
  return (
    <div className="">
      <div className="bg-white ">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-4xl font-bold text-white">
                  Self And Peer Evaluation Portal
                </h2>

                <p className="max-w-xl mt-3 text-gray-300">
                  This portal allows students to do self and peer evaluation and
                  submit to the related units they are currently attending.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
      <span>
        <img
          src="https://pbs.twimg.com/profile_images/1387990771291148290/sRyAuuCS_400x400.jpg"
          alt="Murdoch logo"
          className="object-cover w-24 h-24 rounded-full mx-auto"
        />
      </span>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-center text-gray-700 ">
          Self And Peer Evaluation Portal
        </h2>

        <p className="mt-3 text-gray-500 ">Sign in to access your account</p>
      </div>

      <div className="mt-8">
        <form onSubmit={handleSignIn}>
          <div className="text-left">
            <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@example.com"
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 rounded-md focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm text-gray-600">
                Password
              </label>
            </div>

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your Password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 rounded-md focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#E12945] rounded-md hover:bg-red-400 focus:outline-none focus:bg-red-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
