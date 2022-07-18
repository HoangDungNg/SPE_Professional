import React from "react";

function InputSection({labelText, inputValue, inputID, disable, onChange, inputType}) {
  return (
    disable ?
    <>
      <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
        {labelText}:
      </label>
      <input
        className="block w-full px-4 py-2 text-gray-700 rounded-md bg-[#F5F4F5]"
        disabled
        type="text"
        value={inputValue}
        name=""
        id={inputID}
      />
    </>

    :

    <>
      <label className="block mt-4 text-left mb-2 text-sm font-semibold text-gray-600">
        {labelText}:
      </label>
      <input
        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        type={inputType}
        value={inputValue}
        name=""
        id={inputID}
        onChange={onChange}
      />
    </>
  );
}

export default InputSection;
