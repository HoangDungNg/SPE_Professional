import React from "react";

function TFCard({ tfquestion, id, handleChange, value }) {

  return (
    <div>
      <div className="card mx-auto bg-[#FFFFFF] rounded-lg text-xl p-6 my-4 w-3/5">
        <div className="px-7">
          <p className="text-left">{tfquestion}</p>
        </div>

        <div className="overflow-x-auto overflow-y-hidden">
          <textarea
            name={`txtarea${id}`}
            id={`txtarea${id}`}
            onChange={handleChange}
            value={value.txt1}
            placeholder="Enter description here"
            className="w-full h-28 p-3 text-sm flex flex-row justify-around mt-[20px] text-left bg-[#F8F8FB]"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default TFCard;
