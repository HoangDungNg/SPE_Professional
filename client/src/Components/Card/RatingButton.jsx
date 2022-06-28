import React, { useEffect, useState } from "react";

function RatingButton({ rating, ratingText, id, student, setInputFields, inputFields }) {

  return (
    <div className="p-3">
      <div>
        {/* <span className="title text-sm font-bold">{rating}</span> */}
        <label
          htmlFor={`${student}q${id + 1}Rating`}
          className="title text-sm font-bold"
        >
          {ratingText}
        </label>
      </div>
      <div>
        <input
          type="radio"
          value={rating}
          id={"radioBtn"+id}
          name={`${student}q${id + 1}Rating`}
          className="w-4 h-4 accent-slate-600 outline-8"
        />
      </div>
    </div>
  );
}

export default RatingButton;
