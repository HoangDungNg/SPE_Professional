import React from "react";
import Card from "./Card/Card";
import { CheckBtnProvider } from "../context/CheckBtnContext"

function EachStudSPE({
  SPEQuestions,
  handleChange,
  nameOfUser,
  student,
  studentID,
  fsValue,
  id
}) {
  return (
    <div className="flex flex-col items-center w-full">
      {nameOfUser ? (
        // <div className="w-full mx-auto">
          <div className="card bg-[#FFFFFF] rounded-lg text-xl p-6 my-4 w-3/5">
            <h1 className="text-3xl font-semibold text-center text-gray-800 underline w-full">
              Self Evaluation
            </h1>
            <span className="block text-left my-4 text-sm font-semibold text-gray-600 w-full">
              Your Name:
            </span>
            <input
              type="text"
              disabled
              value={nameOfUser}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />

            <span className="block text-left my-4 text-sm font-semibold text-gray-600">
              Your studentID:
            </span>
            <input
              type="text"
              disabled
              value={studentID}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        // </div>
      ) : (
        // <div className="w-full mx-auto">
          <div className="card bg-[#FFFFFF] rounded-lg text-xl p-6 my-4 w-3/5 mx-auto">
            <h1 className="text-3xl font-semibold text-center text-gray-800 underline underline-offset-0">
              Evaluation of other group members
            </h1>
            <span className="block text-left my-4 text-sm font-semibold text-gray-600">
              Member {id} name:
            </span>
            <input
              type="text"
              disabled
              onChange={handleChange}
              value={fsValue[student + "Name"] === undefined ? "" : fsValue[student + "Name"]}
              // value={fsValue}
              name={`${student}Name`}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <span className="block text-left my-4 text-sm font-semibold text-gray-600">
              Member {id} studentID:
            </span>
            <input
              type="text"
              disabled
              value={fsValue[student + "ID"] === undefined ? "" : fsValue[student + "ID"]}
              onChange={handleChange}
              name={`${student}ID`}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        // </div>
      )}
      <CheckBtnProvider>
        {SPEQuestions.map((question, index) => {
          return question.inputType === "textarea" ? (
            <Card
              question={question.question}
              inputType={question.inputType}
              key={index}
              id={index}
              handleChange={handleChange}
              student={student}
            />
          ) : (
            <Card
              question={question.question}
              inputType={question.inputType}
              key={index}
              id={index}
              handleChange={handleChange}
              student={student}
            />
          );
        })}
      </CheckBtnProvider>
    </div>
  );
}

export default EachStudSPE;
