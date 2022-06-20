import React, { useState } from "react";
import RatingButton from "./RatingButton";

function Card({question, inputType, id, handleChange, student}) {

  return (
      <div className="card mx-auto bg-[#FFFFFF] rounded-lg text-xl p-6 my-4 w-3/5">
        <div className="px-7">
          <p className="text-left">{question}</p>
        </div>

        <div className="overflow-x-auto overflow-y-hidden">

          { inputType === 'fieldset'?
            <fieldset id={`fs${id}`} onChange={handleChange} className="radioGroup flex flex-row justify-around mt-[20px] text-center bg-[#F8F8FB]">
                <RatingButton required rating="Very poor contribution" id={id} student={student} />
                <RatingButton rating="Poor contribution" id={id} student={student} />
                <RatingButton rating="Acceptable contribution" id={id} student={student} />
                <RatingButton rating="Good contribution" id={id} student={student} />
                <RatingButton rating="Excellent contribution" id={id} student={student}/>
            </fieldset>
            :
            <textarea
              name={`${student}q${id+1}txtarea`}
              id={`txtarea${id+1}`}
              onChange={handleChange}
              placeholder="Enter description here"
              className="w-full h-28 p-3 text-sm flex flex-row justify-around mt-[20px] text-left bg-[#F8F8FB] outline-none"
              required
            ></textarea>
          }
        </div>
      </div>
  );
}

export default Card;
