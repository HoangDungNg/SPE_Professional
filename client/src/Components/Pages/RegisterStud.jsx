import React, { useState } from "react";
import { auth, db } from "../../firebase";
import firebase from "firebase/compat/app";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function RegisterStud() {
  const user = useSelector(selectUser);

  const [studentInfo, setStudentInfo] = useState({
    email: "",
    password: "",
    studentId: "",
    name: "",
    attendingUnits: "",
  });

  

  const [csvFile, setCsvFile] = useState("");
//   const [userInfo, setUserInfo] = useState([]);
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

//   const processCSV = (str, delim = ",") => {
//     const headers = str.slice(0, str.indexOf("\n") - 1).split(delim);
//     const allRows = str.slice(str.indexOf("\n") + 1).split("\n");

//     const rows = allRows.map((row) => row.replace("\r", ""));

//     const newArray = rows.map((row) => {
//       const values = row.split(delim);
//       const eachObj = headers.reduce((obj, header, index) => {
//         obj[header] = values[index];
//         return obj;
//       }, {});
//       return eachObj;
//     });
//     // console.log(newArray)

//     newArray.pop(); //Get ride of the last empty record
//     // console.log(newArray);

//     var userInfo = [];

//     newArray.forEach( async (student) => {
//         //   console.log(student.StudentNo);
//         //   console.log(student.GivenName + " " + student.Surname);
//         //   console.log(student.Email);
//         //   console.log(student.Password);
//         //   console.log(student.AttendingUnit)

//       db.collection("testUsers")
//         .where("studentID", "==", student.StudentNo)
//         .where("email", "==", student.Email)
//         .get()
//         .then((snapshot) => {
//           const [data] = snapshot.docs.map((doc) => doc.data());
//           const [id] = snapshot.docs.map((doc) => doc.id);
//         //   console.log(id)
//         //   console.log(data)
//           return [data, id];
//         })
//         .then(([data, id]) => {

//           if (data === undefined) {

//             //Register user
//             console.log("Register user");
//             auth.createUserWithEmailAndPassword(
//                 student.Email,
//                 student.Password
//               )
//             .then((user) => {

//                 var docRef = db.collection("testUsers").doc(user.user.id)

//                 batch.set(docRef, student);

//                 // db.collection("testUsers").add({
//                 //     id: user.user.uid,
//                 //     email: student.Email,
//                 //     role: "student",
//                 //     studentID: student.StudentNo,
//                 //     name: student.GivenName + " " + student.Surname,
//                 //     attendingUnits: student.AttendingUnit
//                 //         ? [student.AttendingUnit]
//                 //         : [],
//                 //     group: "",
//                 //     survey1Status: "not submitted",
//                 //     survey2Status: "not submitted",
//                 //     });

//             }).catch((err) => {
//                 console.log(err)
//             })
//           } 
//           else {
//             //Update user
//             console.log("Update user");

//             // db.collection("users")
//             //   .doc(id)
//             //   .update({
//             //     email: studentInfo.email,
//             //     attendingUnits: firebase.firestore.FieldValue.arrayUnion(
//             //       studentInfo.attendingUnits
//             //     ),
//             //   });
//           }
//         })
//         .catch((err) => {
//             console.log(err)
//         });
        
//     })

    

//     // console.log(userInfo)

//     //Add according to the team with students

//     // submitSuccessMsg("Students and teams added successfully!");
//   };


//   function handleSubmit() {
//     const file = csvFile;
//     const reader = new FileReader();

//     reader.onload = function (e) {
//       const text = e.target.result;
//       processCSV(text);
//     };

//     reader.readAsText(file);
//   }

  function register(e) {
    e.preventDefault();

    //Check if student email exists
    //If exists update details
    db.collection("users")
      .where("studentID", "==", studentInfo.studentId)
      .where("email", "==", studentInfo.email)
      .get()
      .then((snapshot) => {
        const [data] = snapshot.docs.map((doc) => doc.data());
        const [id] = snapshot.docs.map((doc) => doc.id);
        // console.log(id)
        return [data, id];
      })
      .then(([data, id]) => {
        // console.log(data)
        // console.log(id)

        if (data === undefined) {
          //Register user
          console.log("Register user");
          auth
            .createUserWithEmailAndPassword(
              studentInfo.email,
              studentInfo.password
            )
            .then((user) => {
              db.collection("users").add({
                id: user.user.uid,
                email: studentInfo.email,
                role: "student",
                studentID: studentInfo.studentId,
                name: studentInfo.name,
                attendingUnits: studentInfo.attendingUnits
                  ? [studentInfo.attendingUnits]
                  : []
              });
            }).catch((err) => {
              console.log(err)
              alert(err)
              setErrorCaught(true)
            });
        } else {
          //Update user
          console.log("Update user");

          db.collection("users")
            .doc(id)
            .update({
              email: studentInfo.email,
              attendingUnits: firebase.firestore.FieldValue.arrayUnion(
                studentInfo.attendingUnits
              ),
            });
        }
      });
    
      if(errorCaught === false){
        submitSuccessMsg('Student added!')

        setStudentInfo({
          email: "",
          password: "",
          studentId: "",
          name: "",
          attendingUnits: "",
        })
      }

      setErrorCaught(false)
  }
  return (
    <div className="flex flex-[80] h-screen justify-center overflow-auto">
        {/* {userInfo && console.log(userInfo)} */}
      <div className=" w-full pb-10 overflow-auto">
        <div className="bg-[#E12945] text-white h-10 flex justify-center items-center">
          <h2>Add/Update Student</h2>
        </div>

        <div className="mt-6 w-full max-w-2xl px-6 py-4 mx-auto mb-10 bg-white rounded-md shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Add/Update student information
          </h2>
          <p className="mt-3 text-left text-gray-600">
            Please enter the unit code without spacing (eg. ICT302), trimester
            code with year without spacing (eg. TMA2022) and select the how many
            classes this unit is having.
          </p>

          <form className="mt-6 items-center md:flex flex-col">
            <div className="flex flex-col w-full">
              {/* <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
                Upload CSV:
              </label>

              <div className="flex flex-row">
                <input
                  className="block w-full mr-2 px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  type="file"
                  accept=".csv"
                  onChange={(e) => setCsvFile(e.target.files[0])}
                  id="csvFile"
                  placeholder="Please enter team name"
                />
                <button
                  className="px-3 py-3 text-white bg-[#5C7B88] rounded group  focus:outline-none focus:ring"
                  onClick={(e) => {
                    e.preventDefault();
                    if (csvFile) handleSubmit();
                  }}
                >
                  Upload
                </button>
              </div>
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">OR</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div> */}
              <label className="block text-left mb-2 text-sm font-semibold text-gray-600">
                Email:
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type="text"
                value={studentInfo.email}
                onChange={(e) =>
                  setStudentInfo({ ...studentInfo, email: e.target.value })
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
                value={studentInfo.password}
                onChange={(e) =>
                  setStudentInfo({ ...studentInfo, password: e.target.value })
                }
                name=""
                id="passwordInput"
              />
              <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
                Student Number:
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type="text"
                value={studentInfo.studentId}
                onChange={(e) =>
                  setStudentInfo({ ...studentInfo, studentId: e.target.value })
                }
                name=""
                id="studentIDInput"
              />
              <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
                Student Name:
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type="text"
                value={studentInfo.name}
                onChange={(e) =>
                  setStudentInfo({ ...studentInfo, name: e.target.value })
                }
                name=""
                id="studentNameInput"
              />

              <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
                Attending unit:
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type="text"
                value={studentInfo.attendingUnits}
                onChange={(e) =>
                  setStudentInfo({
                    ...studentInfo,
                    attendingUnits: e.target.value,
                  })
                }
                name=""
                id="unitInput"
              />
              {/* <button onClick={register}>Register</button> */}
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

export default RegisterStud;
