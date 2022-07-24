import React from "react";

function StudentInfo({ students, setStudents, index }) {
  return (
    <div>
      <h1 className="m-4 underline">Student {index + 1}</h1>
      <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
        Student {index + 1}'s Student No.:
      </label>
      <input
        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        type="text"
        value={students[index].studentNo}
        onChange={(e) => {
          const id = e.target.id;
          const newArr = [...students];
          newArr[id].studentNo = e.target.value;
          setStudents(newArr);
        }}
        name=""
        id={index}
        placeholder="Please enter student number"
      />
      <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
        Student {index + 1}'s Student Name:
      </label>
      <input
        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        type="text"
        value={students[index].studentName}
        onChange={(e) => {
          const id = e.target.id;
          const newArr = [...students];
          newArr[id].studentName = e.target.value;
          setStudents(newArr);
        }}
        name=""
        id={index}
        placeholder="Please enter name of student"
      />
    </div>
  );
}

export default StudentInfo;
