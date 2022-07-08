import React, { useEffect, useState } from "react";
import userSlice, { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import toast from "react-hot-toast";

function UpdateTeam() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [teamCode, setTeamCode] = useState([])
  const [selectedTeam, setSelectedTeam] = useState("")
  const [unitCode, setUnitCode] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("")
  const [semCode, setSemCode] = useState("");
  const [teamName, setTeamName] = useState("");
  const user = useSelector(selectUser);

  const submitSuccessMsg = (msg, toastHandler = toast) => {
    toastHandler.success(msg, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  //Get the units of this logged in user currently attending
  useEffect(() => {
    
    db.collection("users")
    .doc(user.uid)
    .get()
    .then((doc) => {
      if(doc.exists){
        const data = doc.data()

        //Set the units this current user is attending
        setUnitCode(data.attendingUnits)
      }
    })
    
  }, [user])

  useEffect(() => {
    if(!unitCode) return

    setSelectedUnit(unitCode[0])
  }, [unitCode])

  useEffect(() => {
    if(!teamCode) return

    setSelectedTeam(teamCode[0])
  }, [teamCode])

  useEffect(() => {
    if(unitCode.length === 0 || semCode.length === 0 || teamName.length === 0) return

    setShowDropdown(true);

  },[unitCode, semCode, teamName])

  useEffect(() => {
    if(!selectedUnit || !semCode) return

    db.collection("class")
    .where("unitCode", "==", selectedUnit)
    .where("trimesterCode", "==", semCode)
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data())

      console.log(data)

      data.forEach((eachClass) => {

        if(eachClass.teams.length !== 0){
          eachClass.teams.forEach((team) => {
            setTeamCode((prev) => [...prev, team]);
            // setShowDropdown(true);
          })
        }

      })
    })
  }, [selectedUnit, semCode])

  const updateTeamInfo = (e) => {
    e.preventDefault()

    console.log("button clicked")

    db.collection("teams")
    .where("unitCode", "==", selectedUnit)
    .where("trimesterCode", "==", semCode)
    .where("teamCode", "==", selectedTeam)
    .get()
    .then((snapshot) => {
      const [id] = snapshot.docs.map((doc) => doc.id)

      return id
    })
    .then((id) => {
      try{
        db.collection("teams")
        .doc(id)
        .update({
          teamName: teamName
        })
        submitSuccessMsg("Updated successfully!");
        setShowDropdown(false)
        setSelectedUnit(unitCode[0])
        setSelectedTeam(teamCode[0])
        setSemCode("")
        setTeamName("")
      }
      catch(err){
        console.log(err)
      }
    })
  }
  

  return (
    <div className="flex flex-col flex-[80] h-screen overflow-auto scroll-smooth">
      <div className=" w-full pb-10 overflow-auto">
        <div className="bg-[#E12945] text-white h-10 flex justify-center items-center">
          <h2>Update Team name</h2>
        </div>

        <div className="mt-6 w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Update Team name
          </h2>
          <p className="mt-3 text-left text-gray-600 ">
            Please enter the unit code without spacing (eg. ICT302), trimester
            code with year without spacing (eg. TMA2022) and select your team code 
            (eg. if you're team 1 of class FTA then FTA01).
          </p>

          <form className="mt-6 items-center md:flex flex-col">
            <div className="flex flex-col w-full">
              <label className="block text-left mb-2 text-sm font-semibold text-gray-600">
                Unit Code:
              </label>
              <select
                className="block px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name=""
                id=""
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
              >
                {unitCode.map((unit, index) => 
                  <option key={index} value={unit}>{unit}</option>
                )}

              </select>

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
              <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
                Team name:
              </label>

              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                name=""
                id=""
                placeholder="Your team name"
              />
            </div>

            {showDropdown &&
              <div className="w-full mt-4">
                <label className="block mx-2 text-left mb-2 text-sm font-semibold text-gray-600">
                  Team code:
                </label>

                <select
                  className="block mx-2 px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name=""
                  id=""
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                > 
                  {
                    teamCode?.map((team, index) => 
                      <option key={index} value={team}>{team}</option>)
                  }
                </select>
              </div>
            }

            <button
              onClick={(e) => updateTeamInfo(e)}
              disabled={!showDropdown}
              className="relative mt-6 inline-flex items-center px-8 py-3 overflow-hidden text-white bg-[#5C7B88] rounded group focus:outline-none focus:ring"
            >
              {showDropdown &&
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
              }
              <span className={`text-sm font-medium ${showDropdown && "transition-all group-hover:mr-4"}`}>
                Update
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateTeam;
