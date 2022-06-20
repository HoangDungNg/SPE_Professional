import React from "react";

function RatingButton({ rating, id, student }) {
  return (
    <div className="p-3">
      <div>
        <span className="title text-sm font-bold">{rating}</span>
      </div>
      <div>
        <input
          type="radio"
          value={rating}
          name={`${student}q${id + 1}Rating`}
          className="w-4 h-4 accent-slate-600 outline-8"
        />
      </div>
    </div>
  );
}

export default RatingButton;
