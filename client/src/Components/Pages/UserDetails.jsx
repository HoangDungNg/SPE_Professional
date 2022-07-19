import React, { useState } from "react";
import { auth, db } from "../../firebase";
import firebase from "firebase/compat/app";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import InputSection from "../InputSection";

function UserDetails() {
  const user = useSelector(selectUser);
  const currentUser = firebase.auth().currentUser;

  const [userInfo, setUserInfo] = useState({
    email: "",
    userId: "",
    name: "",
  });

  const [updateUserInfo, setUpdateUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    photoUrl: ""
  });

  const [errorCaught, setErrorCaught] = useState(false);

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
    if (!user) return;

    // console.log(user);

    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          //   console.log(data.studentID);

          if (data.role !== "admin") {
            setUserInfo({
              email: currentUser.email,
              userId: data.studentID,
              name: data.name,
              role: data.role,
              photoUrl: currentUser.photoURL
            });
          } else {
            setUserInfo({
              email: currentUser.email,
              name: data.name,
              role: data.role,
            });
          }
        }
      });
  }, []);

  function updateDetails(e) {
    e.preventDefault();

    // db.collection("users")
    //   .doc(user.uid)
    //   .get()
    //   .then((doc) => {
    //     if (doc.exists) {
    //       // console.log(doc.data())
    //     }
    //   });

    

    if (currentUser !== null) {

        // console.log(currentUser)

        if(updateUserInfo.email !== ''){
            // console.log(updateUserInfo.email)

            // //Update user auth email
            currentUser.updateEmail(updateUserInfo.email)
            .then(() => {
            
                //Update user's email in user collection
                db.collection("users").doc(currentUser.uid)
                .update({ email: updateUserInfo.email})

                // Update successful.
                // console.log("Update successful");
                submitSuccessMsg("Email updated successfully!");
            })
            .catch((error) => {
              // An error ocurred
              console.log(error);
              submitErrorMsg("Error! The email address is badly formatted.");
            });
        }

        if(updateUserInfo.password !== ''){

            currentUser.updatePassword(updateUserInfo.password)
            .then(() => {
            // Update successful.

            // console.log("Update successful");
            submitSuccessMsg("Password updated successfully!");
            })
            .catch((error) => {
            // An error ocurred
            console.log(error);
            submitErrorMsg("Error! Password should be at least 6 characters.");
            });
        }

        if(updateUserInfo.name !== ''){

          currentUser.updateProfile({
            displayName: updateUserInfo.name
          })
          .then(() => {
            db.collection("users").doc(currentUser.uid)
            .update({ name: updateUserInfo.name})
            submitSuccessMsg("Name updated successfully!");
          })
          .catch((error) => {
            // An error ocurred
            console.log(error);
            submitErrorMsg("Error updating name.");
          });
        }
        
        if(updateUserInfo.photoUrl !== ''){
          currentUser.updateProfile({
            photoURL: updateUserInfo.photoUrl
          })
          .then(() => {
            db.collection("users").doc(currentUser.uid)
            .update({ photoUrl: updateUserInfo.photoUrl})
            submitSuccessMsg("Photo updated successfully!");
          })
          .catch((error) => {
            // An error ocurred
            console.log(error);
            submitErrorMsg("Error updating photo URL.");
          });
        }

    

      
    }
    //Check if student email exists
    //If exists update details
    // db.collection("users")
    //   .get()
    //   .then((snapshot) => {
    //     const [data] = snapshot.docs.map((doc) => doc.data());
    //     const [id] = snapshot.docs.map((doc) => doc.id);
    //     // console.log(id)
    //     return [data, id];
    //   })
    //   else {
    //       //Update user
    //       console.log("Update user");

    //       db.collection("users")
    //         .doc(id)
    //         .update({
    //           email: studentInfo.email,
    //           attendingUnits: firebase.firestore.FieldValue.arrayUnion(
    //             studentInfo.attendingUnits
    //           ),
    //         });
    //     }
    //   });

    // submitSuccessMsg("Student added!");

    setUpdateUserInfo({
        name: "",
        email: "",
        password: "",
        photoUrl: ""
    });

    setErrorCaught(false);
  }

  //   function handleChange(e){
  //     console.log(e.target.value);
  //     console.log(e.target)

  //     // setUpdateUserInfo()
  //   }

  return (
    <div className="flex flex-[80] h-screen justify-center overflow-auto">
      <div className=" w-full pb-10 overflow-auto">
        <div className="bg-[#E12945] text-white h-10 flex justify-center items-center">
          <h2>User details</h2>
        </div>
        {console.log(updateUserInfo)}

        <div className="mt-6 w-full max-w-2xl px-6 py-4 mx-auto mb-10 bg-white rounded-md shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            User details
          </h2>
          <p className="mt-3 text-left text-gray-600">
            We have the following personal details recorded for you. You may
            record a Preferred Given name and surname change the existing
            details. After typing in your details, select the Update My Details
            button to save them.
          </p>
          <p className="mt-3 text-left text-gray-600">
            <strong className="text-lg">Please note: </strong>
            Please do not change email and password at the same time.
          </p>

          <form className="mt-6 items-center md:flex flex-col">
            <div className="flex flex-col w-full">
              <h2 className="text-lg font-semibold text-center text-gray-800">
                Details
              </h2>
              {userInfo.role && (
                <>
                  <InputSection
                    labelText={`${userInfo.role
                      .charAt(0)
                      .toUpperCase()}${userInfo.role.slice(1)} ID`}
                    inputType="text"
                    inputValue={userInfo.userId}
                    inputID={"studentIDInput"}
                    disable={true}
                  />
                  <InputSection
                    labelText={"Full name"}
                    inputType="text"
                    inputValue={userInfo.name}
                    inputID={"studentName"}
                    disable={true}
                  />
                  <InputSection
                    labelText={"Email"}
                    inputType="text"
                    inputValue={userInfo.email}
                    inputID={"email"}
                    disable={true}
                  />
                </>
              )}
            </div>
            <div className="flex flex-col w-full mt-6">
              <h2 className="text-lg font-semibold text-center text-gray-800">
                Updateable details
              </h2>

              <InputSection
                labelText={"Full name"}
                inputType="text"
                inputValue={updateUserInfo.name}
                inputID={"studentNameInput"}
                disable={false}
                onChange={(e) =>
                  setUpdateUserInfo({ ...updateUserInfo, name: e.target.value })
                }
              />

              <InputSection
                labelText={"Email"}
                inputType="email"
                inputValue={updateUserInfo.email}
                inputID={"studentEmailInput"}
                disable={false}
                onChange={(e) =>
                  setUpdateUserInfo({
                    ...updateUserInfo,
                    email: e.target.value,
                  })
                }
              />

              <InputSection
                labelText={"Password"}
                inputType="password"
                inputValue={updateUserInfo.password}
                inputID={"studentEmailInput"}
                disable={false}
                onChange={(e) =>
                  setUpdateUserInfo({
                    ...updateUserInfo,
                    password: e.target.value,
                  })
                }
              />

              <InputSection
                labelText={"Photo URL"}
                inputType="text"
                inputValue={updateUserInfo.photoUrl}
                inputID={"studentImgInput"}
                disable={false}
                onChange={(e) =>
                  setUpdateUserInfo({
                    ...updateUserInfo,
                    photoUrl: e.target.value,
                  })
                }
              />

            </div>
            <button
              onClick={updateDetails}
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
                Update my details
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
