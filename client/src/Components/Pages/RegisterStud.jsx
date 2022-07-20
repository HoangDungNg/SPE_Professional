import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { auth2, db2 } from "../../firebase2App"
import firebase from "firebase/compat/app";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { login } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import $ from "jquery"
import { admin } from "../../admin.js"

function RegisterStud() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [csvFile, setCsvFile] = useState("");
  const [errorCaught, setErrorCaught] = useState(false)
  const [students, setStudents] = useState([])
  const [userArr, setUserArr] = useState([])
  const [studentInfo, setStudentInfo] = useState({
    email: "",
    password: "",
    studentId: "",
    name: "",
    attendingUnits: "",
  });


  const submitSuccessMsg = (msg, toastHandler = toast) => {
    toastHandler.success(msg, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const submitErrorMsg = (msg, toastHandler = toast) => {
    toastHandler.error(msg, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };


  useEffect(() => {
    if(!userArr) return;

    var batch = db.batch();

    //If user array is not empty then run this block of code
    if(userArr.length !== 0){
      if(userArr.length === students.length){
  
        //Batch upload user to doc
        userArr.forEach((student) => {
          var docRef = db.collection("users").doc(student.id);

          batch.set(docRef, {
            id: student.id,
            email: student.email,
            role: student.role,
            studentID: student.studentID,
            name: student.name,
            photoUrl: student.photoUrl,
            attendingUnits: student.attendingUnits
          });
        });
  
        //Commit after batch upload
        batch.commit();
  
        //Set array back to empty
        setUserArr([]);
        
        //Set CSV input field back to empty
        setCsvFile("")
        $("#csvFile").val('')
      }
    }
  },[userArr])

  const processCSV = (str, delim = ",") => {
    const headers = str.slice(0, str.indexOf("\n") - 1).split(delim);
    const allRows = str.slice(str.indexOf("\n") + 1).split("\n");

    const rows = allRows.map((row) => row.replace("\r", ""));

    const newArray = rows.map((row) => {
      const values = row.split(delim);
      const eachObj = headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {});
      return eachObj;
    });
    setStudents(newArray)
    newArray.pop(); //Get ride of the last empty record

    var userInfo = [];

    newArray.forEach((student) => {

      db.collection("users")
        .where("studentID", "==", student.StudentID)
        .where("email", "==", student.Email)
        .get()
        .then((snapshot) => {
          const [data] = snapshot.docs.map((doc) => doc.data());
          const [id] = snapshot.docs.map((doc) => doc.id);
            console.log(id)

          if (data === undefined) {

            //Register user
            console.log("Register user");

            auth2.createUserWithEmailAndPassword(
                student.Email,
                student.StudentID
              )
            .then((user) => {

              setUserArr((prev) => [
                ...prev,
                {
                  id: user.user.uid,
                  studentID: student.StudentID,
                  name: student.GivenName + " " + student.Surname,
                  email: student.Email,
                  role: "student",
                  photoUrl: "",
                  attendingUnits: student.UnitCode 
                  ? [student.UnitCode]
                  : []
                }
              ]);

              db.collection("users").doc(user.user.uid).set({
                id: "",
                studentID: "",
                name: "",
                email: "",
                role: "",
                photoUrl: "",
                attendingUnits: []
              });

              auth.signInWithEmailAndPassword(admin.email, admin.password)
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
              .catch((err) => console.log(err));

              setErrorCaught(false)

            }).catch((err) => {
              console.log(err)
              setErrorCaught(true)
            })
          }
          else{

            //Update user doc
            db.collection("users").doc(id).update({
              email: student.Email,
              studentID: student.StudentID,
              name: student.GivenName + " " + student.Surname,
              attendingUnits: firebase.firestore.FieldValue.arrayUnion(student.UnitCode)
            })
          } 

          
           //Reset state to empty after updating
           setCsvFile("")
           $("#csvFile").val('')
        })

        
    })

    if(errorCaught === false){
      submitSuccessMsg("Added/Updated students successfully")
    }
    else{
      submitErrorMsg("Error adding/updating student")
    }

    

    // console.log(userInfo)

    //Add according to the team with students

    // submitSuccessMsg("Students and teams added successfully!");
  };


  function handleSubmit() {
    const file = csvFile;
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      processCSV(text);
    };

    reader.readAsText(file);
  }

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
        return [data, id];
      })
      .then(([data, id]) => {

        //If data not found register user
        if (data === undefined) {
          
          //Register user
          auth.createUserWithEmailAndPassword(
              studentInfo.email,
              studentInfo.password
            )
            .then((user) => {
              db.collection("users").doc(user.user.uid).set({
                id: user.user.uid,
                email: studentInfo.email,
                role: "student",
                studentID: studentInfo.studentId,
                name: studentInfo.name,
                attendingUnits: studentInfo.attendingUnits
                  ? [studentInfo.attendingUnits]
                  : []
              });

              auth.signInWithEmailAndPassword(admin.email, admin.password)
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
              .catch((error) => console.log(error));

              submitSuccessMsg('Student added!')
              
              setStudentInfo({
                email: "",
                password: "",
                studentId: "",
                name: "",
                attendingUnits: "",
              })

            }).catch((err) => {
              console.log(err)
              alert(err)
            });
        } 
        else{
          submitSuccessMsg("Student already registered, updated attending units")

          //If user already registered update only attendingUnits
          db.collection("users")
            .doc(id)
            .update({
              attendingUnits: firebase.firestore.FieldValue.arrayUnion(
                studentInfo.attendingUnits
              ),
          });

          setStudentInfo({
            email: "",
            password: "",
            studentId: "",
            name: "",
            attendingUnits: "",
          })
        }
        // else { //If user found in database update user
          //Update user
          // console.log("Update user");

          // db.collection("users")
          //   .doc(id)
          //   .update({
          //     attendingUnits: firebase.firestore.FieldValue.arrayUnion(
          //       studentInfo.attendingUnits
          //     ),
          // });
        // }
      });
    
      // if(errorCaught === false){
      //   submitSuccessMsg('Student added!')

      //   setStudentInfo({
      //     email: "",
      //     password: "",
      //     studentId: "",
      //     name: "",
      //     attendingUnits: "",
      //   })
      // }
      // else if(errorCaught === true){
      //   submitErrorMsg("Student already registered")
      // }

      setErrorCaught(false)
  }


  return (
    <div className="flex flex-[80] h-screen justify-center overflow-auto">
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
              <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
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
              </div>
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
