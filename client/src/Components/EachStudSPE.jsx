import React, { useState } from "react";
import Card from "./Card/Card";

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
    <div>
      {nameOfUser ? (
        <div>
          <div className="card mx-auto bg-[#FFFFFF] rounded-lg text-xl p-6 my-4 w-3/5">
            <h1 className="text-3xl font-semibold text-center text-gray-800 underline">
              Self Evaluation
            </h1>
            <span className="block text-left my-4 text-sm font-semibold text-gray-600">
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
        </div>
      ) : (
        <div>
          <div className="card mx-auto bg-[#FFFFFF] rounded-lg text-xl p-6 my-4 w-3/5">
            <h1 className="text-3xl font-semibold text-center text-gray-800 underline underline-offset-0">
              Evaluation of other group members
            </h1>
            <span className="block text-left my-4 text-sm font-semibold text-gray-600">
              Member {id} name:
            </span>
            <input
              type="text"
              onChange={handleChange}
              value={fsValue === [] ? "" : fsValue[student + "name"]}
              name={`${student}Name`}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <span className="block text-left my-4 text-sm font-semibold text-gray-600">
              Member {id} studentID:
            </span>
            <input
              type="text"
              value={fsValue === [] ? "" : fsValue[student + "ID"]}
              onChange={handleChange}
              name={`${student}ID`}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>
      )}
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
    </div>
  );
}

export default EachStudSPE;
