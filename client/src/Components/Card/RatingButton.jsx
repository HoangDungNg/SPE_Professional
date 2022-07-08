import React, { useContext, useEffect, useState } from "react";
import { CheckBtnContext } from "../../context/CheckBtnContext";

function RatingButton({ rating, ratingText, id, index, student }) {


  return (
    <div className="p-3">
      <div>
        <label
          htmlFor={`${student}q${id + 1}Rating`}
          className="title text-sm font-bold"
        >
          {ratingText}
        </label>
      </div>
      <div>
        <input
          className="w-4 h-4 accent-slate-600 outline-8"
          type="radio"
          value={rating}
          id={`fs${id}radioBtn${index}`}
          name={`${student}q${id + 1}Rating`}
        />
      </div>
    </div>
  );
}

export default RatingButton;
