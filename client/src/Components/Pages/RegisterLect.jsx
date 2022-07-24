import React, { useState } from "react";
import { auth, db } from "../../firebase";
import firebase from "firebase/compat/app";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { admin } from "../../admin.js"
import { login } from "../../features/userSlice";

function RegisterLect() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  const [lecturerInfo, setlecturerInfo] = useState({
    email: "",
    password: "",
    lecturerId: "",
    name: "",
    attendingUnits: "",
  });

  

  const [csvFile, setCsvFile] = useState("");
  const [errorCaught, setErrorCaught] = useState(false)

var batch = db.batch();


  const submitSuccessMsg = (msg, toastHandler = toast) => {
    toastHandler.success(msg, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };


  function register(e) {
    e.preventDefault();

    //Check if lecturer email exists
    //If exists update details
    db.collection("users")
      .where("studentID", "==", lecturerInfo.lecturerId)
      .where("email", "==", lecturerInfo.email)
      .get()
      .then((snapshot) => {
        const [data] = snapshot.docs.map((doc) => doc.data());
        const [id] = snapshot.docs.map((doc) => doc.id);
        return [data, id];
      })
      .then(([data, id]) => {

        if (data === undefined) {
          
          //Register user
          auth
            .createUserWithEmailAndPassword(
              lecturerInfo.email,
              lecturerInfo.password
            )
            .then((user) => {
              db.collection("users").doc(user.user.uid).set({
                id: user.user.uid,
                email: lecturerInfo.email,
                role: "lecturer",
                studentID: lecturerInfo.lecturerId,
                name: lecturerInfo.name,
                attendingUnits: lecturerInfo.attendingUnits
                  ? [lecturerInfo.attendingUnits]
                  : []
              });


            }).catch((err) => {
              console.log(err)
              alert(err)
              setErrorCaught(true)
            });

            // auth.signInWithEmailAndPassword(admin.email, admin.password)
            // .then((userAuth) => {
            //   dispatch(
            //     login({
            //       email: userAuth.user.email,
            //       uid: userAuth.user.uid,
            //       displayName: userAuth.user.displayName,
            //       photoUrl: userAuth.user.photoURL,
            //     })
            //   );
            // })
            // .catch((error) => console.log(error));

        } else {

          //Update user
          db.collection("users")
            .doc(id)
            .update({
              email: lecturerInfo.email,
              attendingUnits: firebase.firestore.FieldValue.arrayUnion(
                lecturerInfo.attendingUnits
              ),
            });
        }
      });

      
    
      if(errorCaught === false){
        submitSuccessMsg('Lecturer added!')

        setlecturerInfo({
          email: "",
          password: "",
          lecturerId: "",
          name: "",
          attendingUnits: "",
        })
      }

      setErrorCaught(false)
  }
  return (
    <div className="flex flex-[80] h-screen justify-center overflow-auto">
      <div className=" w-full pb-10 overflow-auto">
        <div className="bg-[#E12945] text-white h-10 flex justify-center items-center">
          <h2>Add/Update Lecturer</h2>
        </div>

        <div className="mt-6 w-full max-w-2xl px-6 py-4 mx-auto mb-10 bg-white rounded-md shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Add/Update lecturer information
          </h2>
          <p className="mt-3 text-left text-gray-600">
            Please enter the unit code without spacing (eg. ICT302), trimester
            code with year without spacing (eg. TMA2022) and select the how many
            classes this unit is having.
          </p>

          <form className="mt-6 items-center md:flex flex-col">
            <div className="flex flex-col w-full">
              <label className="block text-left mb-2 text-sm font-semibold text-gray-600">
                Email:
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type="text"
                value={lecturerInfo.email}
                onChange={(e) =>
                  setlecturerInfo({ ...lecturerInfo, email: e.target.value })
                }
                name=""
                id="emailInput"
              />
              <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
                Password:
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type="password"
                value={lecturerInfo.password}
                onChange={(e) =>
                  setlecturerInfo({ ...lecturerInfo, password: e.target.value })
                }
                name=""
                id="passwordInput"
              />
              <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
                Lecturer Number:
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type="text"
                value={lecturerInfo.lecturerId}
                onChange={(e) =>
                  setlecturerInfo({ ...lecturerInfo, lecturerId: e.target.value })
                }
                name=""
                id="lecturerIDInput"
              />
              <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
                Lecturer Name:
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type="text"
                value={lecturerInfo.name}
                onChange={(e) =>
                  setlecturerInfo({ ...lecturerInfo, name: e.target.value })
                }
                name=""
                id="studentNameInput"
              />

              <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
                Teaching unit:
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type="text"
                value={lecturerInfo.attendingUnits}
                onChange={(e) =>
                  setlecturerInfo({
                    ...lecturerInfo,
                    attendingUnits: e.target.value,
                  })
                }
                name=""
                id="unitInput"
              />
            </div>
            <button
              onClick={register}
              className="relative mt-6 inline-flex items-center px-8 py-3 overflow-hidden text-white bg-[#5C7B88] rounded group focus:outline-none focus:ring"
            >
              <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <span className="text-sm font-medium transition-all group-hover:mr-4">
                Register
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterLect;
