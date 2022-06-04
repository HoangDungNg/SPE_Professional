import React from "react";
import RatingButton from "./RatingButton";

function Card({question, inputType, id, handleChange}) {

  return (
      <div className="card mx-auto bg-[#FFFFFF] rounded-lg text-xl p-6 my-4 w-3/5">
        <div className="px-7">
          <p className="text-left">{question}</p>
        </div>
        
        <div className="overflow-x-auto overflow-y-hidden">
          { inputType === 'fieldset'?
            <fieldset id={`fs${id}`} onChange={handleChange} className="radioGroup flex flex-row justify-around mt-[20px] text-center bg-[#F8F8FB]">
                <RatingButton rating="Very poor contribution" id={id} />
                <RatingButton rating="Poor contribution" id={id} />
                <RatingButton rating="Acceptable contribution" id={id} />
                <RatingButton rating="Good contribution" id={id} />
                <RatingButton rating="Excellent contribution" id={id} />
            </fieldset>
            :
            <textarea
              name={`txtarea${id}`}
              id={`txtarea${id}`}
              onChange={handleChange}
              placeholder="Enter description here"
              className="w-full h-28 p-3 text-sm flex flex-row justify-around mt-[20px] text-left bg-[#F8F8FB]"
            ></textarea>
          }
        </div>
      </div>
  );
}

export default Card;
