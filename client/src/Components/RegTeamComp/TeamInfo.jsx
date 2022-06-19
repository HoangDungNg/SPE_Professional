import React from "react";

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
  return (
    <div>
      <h1 className="m-4 underline">Team information</h1>
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
