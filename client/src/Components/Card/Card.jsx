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

  const radioButtonDetails = [
    {
      rating: "1",
      ratingText: "Very poor contribution",
    },
    {
      rating: "2",
      ratingText: "Poor contribution",
    },
    {
      rating: "3",
      ratingText: "Acceptable contribution",
    },
    {
      rating: "4",
      ratingText: "Good contribution",
    },
    {
      rating: "5",
      ratingText: "Excellent contribution",
    }
  ]


  return (
    <div className="card bg-[#FFFFFF] rounded-lg text-xl p-6 my-4 w-3/5">
      {/* {console.log(checkedState)} */}
      <div className="px-7 w-full">
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
            {radioButtonDetails.map((button, index) => 
              <RatingButton
                key={index}
                rating={button.rating}
                ratingText={button.ratingText}
                id={id}
                index={index}
                student={student}
                fieldset={`fs${id}`}
              />
            )}
            {/* <RatingButton
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
            /> */}
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
