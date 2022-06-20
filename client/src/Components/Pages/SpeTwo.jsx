import React, { useEffect, useState } from "react";
import { SPE2Questions } from "../../js/list";
import SPEContent from "../SPEContent";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { Link, useParams } from "react-router-dom";

function SPEOne() {
  const [fsValue, setFsValue] = useState([]);
  const [SPEQuestions, setSPEQuestions] = useState([]);
  const [unitCode, setUnitCode] = useState("");
  const user = useSelector(selectUser);
  const [nameOfUser, setNameofUser] = useState("");
  const [studentID, setStudentID] = useState("");
  const { spe2UnitCode } = useParams();

  useEffect(() => {
    //This prevents stacking of 2 different unit's SPE questions
    setSPEQuestions([]);

    try {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            // const [attendingUnits] = doc.data().attendingUnits;
            const name = data.name;
            const studentID = data.studentID;
            setNameofUser(name);
            setStudentID(studentID);
            // return attendingUnits;
          }
        });

      db.collection("spe2")
        .where("unitCode", "==", spe2UnitCode)
        .where("trimesterCode", "==", "TMA2022")
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data());
          // console.log(data);
          data[0].questions.map((question) =>
            setSPEQuestions((prevItem) => [...prevItem, question])
          );
          setUnitCode(data[0].unitCode);
        });
    } catch (err) {
      console.log(err);
    }
  }, [spe2UnitCode]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFsValue({ ...fsValue, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(fsValue);

    //TODO: Go to user's collection update spe submission status
    //TODO: Go to feed update user submitted spe form
  }

  console.log(SPEQuestions);

  return (
    <div className="flex flex-col flex-[80] h-screen justify-center overflow-auto scroll-smooth">
      {SPEQuestions.length === 0 ? (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-white">
          <h1>SPE not available</h1>
          <h1 class="text-9xl font-extrabold text-[#1A2238] tracking-widest">
            404
          </h1>
          <div class="bg-[#E12945] px-2 text-sm rounded rotate-12 absolute">
            Page Not Found
          </div>
          <button class="mt-5">
            <Link
              to="/"
              className="relative inline-block text-sm font-medium text-[#E12945] group active:text-orange-500 focus:outline-none focus:ring"
            >
              <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

              <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
                <router-link to="/">Go Home</router-link>
              </span>
            </Link>
          </button>
        </div>
      ) : (
        <SPEContent
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          SPEQuestions={SPEQuestions}
          unitCode={spe2UnitCode}
          nameOfUser={nameOfUser}
          studentID={studentID}
          fsValue={fsValue}
          formNumber={2}
        />
      )}
    </div>
  );
}

export default SPEOne;
