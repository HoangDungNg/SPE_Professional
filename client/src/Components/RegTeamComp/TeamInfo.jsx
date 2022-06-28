import React, { useState } from "react";
import { db } from "../../firebase";
import firebase from "firebase/compat/app";
import toast from "react-hot-toast";

function TeamInfo({
  teamNo,
  setTeamNo,
  unitCode,
  setUnitCode,
  classID,
  setClassID,
  trimesterCode,
  setTrimesterCode,
  teamName,
  setTeamName,
}) {
  const [csvFile, setCsvFile] = useState("");
  const [csvArray, setCsvArray] = useState([]);

  const submitSuccessMsg = (msg, toastHandler = toast) => {
    toastHandler.success(msg, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

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
    // console.log(newArray)

    newArray.pop(); //Get ride of the last empty record
    // console.log(newArray);

    //Assuming the csv file is uploaded class by class, (eg. FTA is 1 .csv file FTB is 1 .csv file)

    const result = Array.from(new Set(newArray.map((item) => item.TeamID))).map(
      (id) => {
        return {
          teamCode: id,
          classCode: newArray.find((item) => item.TeamID === id).ClassCode,
          trimesterCode: newArray.find((item) => item.TeamID === id)
            .TeachPeriod,
          unitCode: newArray.find((item) => item.TeamID === id).UnitCode,
        };
      }
    );

    //Add empty teams first
    result.forEach((team) => {
      db.collection("teamTest")
        .where("teamCode", "==", team.teamCode)
        .where("classCode", "==", team.classCode)
        .where("trimesterCode", "==", team.trimesterCode)
        .where("unitCode", "==", team.unitCode)
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data());

          if (data.length === 0) {
            console.log("No data found, add");
            db.collection("teamTest").add({
              teamName: "",
              teamCode: team.teamCode,
              classCode: team.classCode,
              trimesterCode: team.trimesterCode,
              unitCode: team.unitCode,
            });
          } else {
            console.log("Data found, update");
            newArray.forEach((student) => {
              db.collection("teamTest")
                .where("unitCode", "==", student.UnitCode)
                .where("trimesterCode", "==", student.TeachPeriod)
                .where("classCode", "==", student.ClassCode)
                .where("teamCode", "==", student.TeamID)
                .get()
                .then((snapshot) => {
                  const data = snapshot.docs.map((doc) => doc.data());
                  const [id] = snapshot.docs.map((doc) => doc.id);

                  // If data found update
                  if (data.length !== 0) {
                    console.log("Data found, updated data");
                    db.collection("teamTest")
                      .doc(id)
                      .update({
                        members: firebase.firestore.FieldValue.arrayUnion({
                          studentNo: student.PersonID,
                          studentName:
                            student.GivenName + " " + student.Surname,
                        }),
                      });
                  }
                });
            });
          }
        });
    });

    //Add according to the team with students

    submitSuccessMsg("Students and teams added successfully!");
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

  return (
    <div>
      <h1 className="m-4 underline">Team information</h1>
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
        {/* {csvArray && console.log(csvArray)} */}
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
      <div class="relative flex py-5 items-center">
        <div class="flex-grow border-t border-gray-400"></div>
        <span class="flex-shrink mx-4 text-gray-400">OR</span>
        <div class="flex-grow border-t border-gray-400"></div>
      </div>
      <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
        Team number:
      </label>

      <input
        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        type="text"
        value={teamNo}
        onChange={(e) => {
          setTeamNo(e.target.value);
          console.log(teamNo);
        }}
        name=""
        id=""
        placeholder="Please enter team number (Eg. 1, 2, 3)"
      />

      <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
        Unit Code:
      </label>

      <input
        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        type="text"
        value={unitCode}
        onChange={(e) => setUnitCode(e.target.value)}
        name=""
        id=""
        placeholder="Please enter unit code (Eg. ICT302)"
      />

      <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
        Class:
      </label>

      <input
        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        type="text"
        value={classID}
        onChange={(e) => setClassID(e.target.value)}
        name=""
        id=""
        placeholder="Please enter class code (Eg. FTA)"
      />

      <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
        Trimester Code:
      </label>

      <input
        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        type="text"
        value={trimesterCode}
        onChange={(e) => setTrimesterCode(e.target.value)}
        name=""
        id=""
        placeholder="Please enter trimester code (Eg. TMA2022)"
      />

      <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
        Team name:
      </label>

      <input
        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        name=""
        id=""
        placeholder="Please enter team name"
      />
    </div>
  );
}

export default TeamInfo;
