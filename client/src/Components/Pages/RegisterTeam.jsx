import React, { useState } from "react";
import { db } from "../../firebase";
import firebase from "firebase/compat/app";
import TeamInfo from "../RegTeamComp/TeamInfo";
import StudentInfo from "../RegTeamComp/StudentInfo";
import toast from "react-hot-toast";

function RegisterTeam() {
  const [cardID, setCardID] = useState(0);
  const [teamNo, setTeamNo] = useState("");
  const [unitCode, setUnitCode] = useState("");
  const [classID, setClassID] = useState("");
  const [trimesterCode, setTrimesterCode] = useState("");
  const [teamName, setTeamName] = useState("");

  const emptyStudArr = [
    {
      studentNo: "",
      studentName: "",
    },
    {
      studentNo: "",
      studentName: "",
    },
    {
      studentNo: "",
      studentName: "",
    },
    {
      studentNo: "",
      studentName: "",
    },
    {
      studentNo: "",
      studentName: "",
    },
    {
      studentNo: "",
      studentName: "",
    },
  ];

  const [students, setStudents] = useState(emptyStudArr);

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

  function registerTeams(e) {
    e.preventDefault();
    //User enters teamNo, unitCode, classID, teamName and all student's studentNo and studentName
    //Go to "class" collection search with unitCode, trimesterCode, classID
    // -> then() pass the id to of class doc
    // -> Go to "class" collection with the doc ID and update the teams array and add teamID e.g [FTA01]
    //-> If the teamID already exists it will not add anything to the array
    //e.g add FTA01, array already contains [FTA01], it will not add
    // -> then() go to "team" collection and add team

    teamNo === "" ||
    unitCode === "" ||
    classID === "" ||
    trimesterCode === "" ||
    teamName === "" ||
    students === emptyStudArr
      ? submitErrorMsg("Please do not submit empty fields")
      : db.collection("class")
          .where("unitCode", "==", unitCode)
          .where("trimesterCode", "==", trimesterCode)
          .where("classCode", "==", classID)
          .get()
          .then((snapshot) => {
            const id = snapshot.docs.map((doc) => doc.id);
            // const triCode = snapshot.docs.map((doc) => doc.data().trimesterCode);
            return id;
          })
          .then((id) => {
            const [docID] = id;

            console.log(docID);
            console.log(trimesterCode);

            db.collection("class")
              .doc(docID)
              .update(
                "teams",
                firebase.firestore.FieldValue.arrayUnion(classID + "0" + teamNo)
              );
          })
          .then(() => {
            console.log(unitCode);
            console.log(trimesterCode);
            console.log(classID);
            console.log(classID + "0" + teamNo);

            db.collection("teams")
              .where("unitCode", "==", unitCode)
              .where("trimesterCode", "==", trimesterCode)
              .where("classCode", "==", classID)
              .where("teamCode", "==", classID + "0" + teamNo)
              .get()
              .then((snapshot) => {
                const [id] = snapshot.docs.map((doc) => doc.id);

                console.log(id);

                const teamsCollection = db.collection("teams");

                if (id === undefined) {
                  teamsCollection.add({
                    unitCode: unitCode,
                    trimesterCode: trimesterCode,
                    classCode: classID,
                    teamCode: classID + "0" + teamNo,
                    teamName: teamName,
                    members: students,
                  });

                  //Reset every fields to default values
                  setCardID(0);
                  setTeamNo("");
                  setUnitCode("");
                  setClassID("");
                  setTrimesterCode("");
                  setTeamName("");
                  setStudents(emptyStudArr);

                  submitSuccessMsg("Team added successfully!");
                  console.log("Team not found, added team into firebase");
                } else {
                  teamsCollection.doc(id).update({
                    unitCode: unitCode,
                    trimesterCode: trimesterCode,
                    classCode: classID,
                    teamCode: classID + "0" + teamNo,
                    teamName: teamName,
                    members: students,
                  });

                  //Reset every fields to default values
                  setCardID(0);
                  setTeamNo("");
                  setUnitCode("");
                  setClassID("");
                  setTrimesterCode("");
                  setTeamName("");
                  setStudents(emptyStudArr);

                  submitSuccessMsg("Team updated successfully!");
                  console.log("Team found, updated team on firebase");
                }
              });
          });
  }

  function formDisplay() {
    if (cardID === 0) {
      return (
        <TeamInfo
          teamNo={teamNo}
          setTeamNo={setTeamNo}
          unitCode={unitCode}
          setUnitCode={setUnitCode}
          classID={classID}
          setClassID={setClassID}
          trimesterCode={trimesterCode}
          setTrimesterCode={setTrimesterCode}
          teamName={teamName}
          setTeamName={setTeamName}
        />
      );
    } else {
      const studForm = students.map((student, index) => (
        <StudentInfo
          key={index}
          students={students}
          setStudents={setStudents}
          index={index}
        />
      ));

      return studForm[cardID - 1];
    }
  }

  return (
    <div className="flex flex-[80] h-screen justify-center overflow-auto">
      <div className=" w-full pb-10 overflow-auto">
        {/* <Toaster position="bottom-right" reverse={false} /> */}
        <div className="bg-[#E12945] text-white h-10 flex justify-center items-center">
          <h2>Register Team</h2>
        </div>

        <div className="mt-6 w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Register/Update team
          </h2>
          <p className="mt-3 text-center text-gray-600 ">
            Please enter the unit code without spacing (eg. ICT302), trimester
            code with year without spacing (eg. TMA2022) and select the how many
            classes this unit is having.
          </p>
          <form className="mt-6 items-center md:flex flex-col" action="">
            <div className="flex flex-col w-full">
              {formDisplay()}
              {/* {console.log(students)} */}
              {/* {console.log(cardID)} */}
            </div>
            <div
              id="btnContainer"
              className={`flex flex-row w-full mt-8 ${
                cardID === 0 ? "justify-center" : "justify-between"
              } `}
            >
              {cardID === 0 ? null : (
                <button
                  type="button"
                  onClick={() => setCardID((currPage) => currPage - 1)}
                  disabled={cardID === 0}
                  className="relative inline-flex items-center px-8 py-3 overflow-hidden text-white bg-[#5C7B88] rounded group  focus:outline-none focus:ring"
                >
                  <span class="absolute left-0 transition-transform -translate-x-full group-hover:translate-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-arrow-narrow-left"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <line x1="5" y1="12" x2="9" y2="16"></line>
                      <line x1="5" y1="12" x2="9" y2="8"></line>
                    </svg>
                  </span>
                  <span className="text-sm font-medium transition-all group-hover:ml-4">
                    Prev
                  </span>
                </button>
              )}

              {cardID !== 6 ? (
                <button
                  type="button"
                  onClick={() => setCardID((currPage) => currPage + 1)}
                  className="relative inline-flex items-center px-8 py-3 overflow-hidden text-white bg-[#5C7B88] rounded group focus:outline-none focus:ring"
                >
                  <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-arrow-narrow-right"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <line x1="15" y1="16" x2="19" y2="12"></line>
                      <line x1="15" y1="8" x2="19" y2="12"></line>
                    </svg>
                  </span>
                  <span className="text-sm font-medium transition-all group-hover:mr-4">
                    Next
                  </span>
                </button>
              ) : (
                <button
                  // type="submit"
                  type="button"
                  onClick={registerTeams}
                  className="relative inline-flex items-center px-8 py-3 overflow-hidden text-white bg-[#5C7B88] rounded group focus:outline-none focus:ring"
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
                    Submit
                  </span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterTeam;
