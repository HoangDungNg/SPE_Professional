import React, { useState } from "react";
import { useEffect } from "react";
import RatingButton from "./RatingButton";

function Card({
  question,
  inputType,
  id,
  handleChange,
  student
}) {
  return (
    <div className="card mx-auto bg-[#FFFFFF] rounded-lg text-xl p-6 my-4 w-3/5">
      <div className="px-7">
        <p className="text-left">{question}</p>
      </div> 
      <div className="overflow-x-auto overflow-y-hidden">
        {inputType === "fieldset" ? (
          <fieldset
            id={`fs${id}`}
            name={`fs${id}${student}`}
            onChange={handleChange}
            className="radioGroup flex flex-row justify-around mt-[20px] text-center bg-[#F8F8FB]"
          >
            <RatingButton
              rating="1"
              ratingText={"Very poor contribution"}
              id={id}
              student={student}
            />
            <RatingButton
              rating="2"
              ratingText={"Poor contribution"}
              id={id}
              student={student}
            />
            <RatingButton
              rating="3"
              ratingText={"Acceptable contribution"}
              id={id}
              student={student}
            />
            <RatingButton
              rating="4"
              ratingText={"Good contribution"}
              id={id}
              student={student}
            />
            <RatingButton
              rating="5"
              ratingText={"Excellent contribution"}
              id={id}
              student={student}
            />
          </fieldset>
        ) : (
          <textarea
            name={`${student}q${id + 1}txtarea`}
            id={`txtarea${id + 1}`}
            onChange={handleChange}
            placeholder="Enter description here"
            className="w-full h-28 p-3 text-sm flex flex-row justify-around mt-[20px] text-left bg-[#F8F8FB] outline-none"
            required
          ></textarea>
        )}
      </div>
    </div>
  );
}

export default Card;
