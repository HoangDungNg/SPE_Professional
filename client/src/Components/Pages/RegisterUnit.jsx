import React, { useState } from "react";
import { db } from "../../firebase";
import toast from "react-hot-toast";

function RegisterUnit() {
  const [unitCode, setUnitCode] = useState("");
  const [semCode, setSemCode] = useState("");
  const [noOfClasses, setNoOfClasses] = useState("");
  const [classCode, setClassCode] = useState(["FTA"]);
  const [navUnit, setNavUnit] = useState([]);

  function handleOnChange(e) {
    setNoOfClasses(e.target.value);

    switch (e.target.value) {
      case "1":
        setClassCode(["FTA"]);
        break;
      case "2":
        setClassCode(["FTA", "FTB"]);
        break;
      case "3":
        setClassCode(["FTA", "FTB", "FTC"]);
        break;
      case "4":
        setClassCode(["FTA", "FTB", "FTC", "FTD"]);
        break;
      default:
        setClassCode(["FTA"]);
        break;
    }
  }

  const submitSuccessMsg = (msg, toastHandler = toast) => {
    toastHandler.success(msg, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  function registerUnit(e) {
    e.preventDefault();

    //User enter unitCode, trimesterCode and select number of classes clicks on register button
    //-> Go to "module" collection search with unitCode and trimesterCode entered
    //-> check if module exist
    //-> add/update module
    //-> then() go to "module" collection search with unitCode and trimesterCode again
    //-> get the classes in array eg. ['FTA', 'FTB']
    //-> then() pass the classes array down
    //-> for each class go to "class" collection search with unitCode, trimesterCode and the class
    //-> Check if the class exist
    //-> if class not found, add, else return and do nothing

    //Check if unit exists, if not exist add
    db.collection("module")
      .where("unitCode", "==", unitCode)
      .where("trimesterCode", "==", semCode)
      .get()
      .then((snapshot) => {
        const [id] = snapshot.docs.map((doc) => doc.id);
        const module = db.collection("module");

        if (id === undefined) {
          //If there is no record add record
          module.add({
            unitCode: unitCode,
            trimesterCode: semCode,
            classes: classCode,
          });

          submitSuccessMsg("Module added successfully!")

          console.log("Module not found, module added to firebase.");
        } else {
          //If there is record, update record
          module.doc(id).update({
            unitCode: unitCode,
            trimesterCode: semCode,
            classes: classCode,
          });

          submitSuccessMsg("Module updated successfully!")

          console.log("Module found, updated module on firebase.");
        }
      })
      .then(() => {
        //Add Module with unit code, trimester code and classes (FTA, FTB,...)
        db.collection("module")
          .where("unitCode", "==", unitCode)
          .where("trimesterCode", "==", semCode)
          .get()
          .then((snapshot) => {
            const [data] = snapshot.docs.map((doc) => doc.data());
            const classes = data.classes.map((doc) => doc);
            return classes;
          })
          .then((classes) => {
            const classCollection = db.collection("class");

            classes.forEach((classID) => {
              db.collection("class")
                .where("unitCode", "==", unitCode)
                .where("trimesterCode", "==", semCode)
                .where("classCode", "==", classID)
                .get()
                .then((snapshot) => {
                  const [id] = snapshot.docs.map((doc) => doc.id);

                  console.log(id);

                  if (id === undefined) {
                    classCollection.add({
                      unitCode: unitCode,
                      trimesterCode: semCode,
                      classCode: classID,
                      teams: [],
                    });

                    console.log("Class not found, class added to firebase.");
                  } else {
                    console.log("Class found, return");
                    return;
                  }
                });
            });
          });
      });
  }

  return (
    <div className="flex flex-[80] h-screen justify-center overflow-auto">
      <div className=" w-full pb-10 overflow-auto">
        <div className="bg-[#E12945] text-white h-10 flex justify-center items-center">
          <h2>Register/Update Unit</h2>
        </div>

        {/* <h1 className="text-3xl font-semibold text-center text-gray-800">Register units</h1> */}
        <div className="mt-6 w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md">
            <h2 className="text-3xl font-semibold text-center text-gray-800">Register/Update units</h2>
            <p className="mt-3 text-center text-gray-600 ">
                Please enter the unit code without spacing (eg. ICT302), trimester code with year without spacing (eg. TMA2022) 
                and select the how many classes this unit is having.
            </p>
          <form className="mt-6 items-center md:flex flex-col">
            <div className="flex flex-col w-full">
                {/* <div class="w-full mx-2"> */}
                    <label className="block text-left mb-2 text-sm font-semibold text-gray-600">
                        Unit Code:
                    </label>
                    <input
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    type="text"
                    value={unitCode}
                    onChange={(e) => setUnitCode(e.target.value)}
                    name=""
                    id=""
                    placeholder="E.g ICT302"
                    />
                {/* </div> */}

                {/* <div className="w-full mx-2 mt-4 md:mt-0"> */}
                    <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
                        Trimester Code:
                    </label>

                    <input
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    type="text"
                    value={semCode}
                    onChange={(e) => setSemCode(e.target.value)}
                    name=""
                    id=""
                    placeholder="E.g TMA2022"
                    />
                {/* </div> */}
            </div>

            <div className="w-full mt-4">
                <label className="block mx-2 text-left mb-2 text-sm font-semibold text-gray-600">
                Number of classes:
                </label>

                <select
                className="block mx-2 px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="" id="" value={noOfClasses} onChange={handleOnChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                </select>
            </div>

            {/* <button onClick={registerUnit}>Register</button> */}
            <button
            //   type="submit"
                onClick={registerUnit}
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

export default RegisterUnit;
