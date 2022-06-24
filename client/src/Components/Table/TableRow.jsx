import React from "react";
import StatusTag from "./StatusTag";

function TableRow({
  name,
  email,
  memberId,
  survey1Status,
  survey2Status,
  group,
  action,
  teamName,
}) {
  // function handleDownload(){
  //   //Download form according to the user selected with their unique ID
  //   console.log(`Download ${name}'s survey1 with ID of: ${memberId}`)
  // }

  return (
    <tr>
      <td className="p-4 text-gray-700 whitespace-nowrap">{group}</td>
      <td className="p-4 text-gray-700 whitespace-nowrap">{teamName}</td>
      <td className="p-4 font-medium whitespace-nowrap">{memberId}</td>
      <td className="p-4 font-medium whitespace-nowrap">{name}</td>
      <td className="p-4 text-gray-700 whitespace-nowrap">{email}</td>
      <StatusTag
        status={survey1Status.charAt(0).toUpperCase() + survey1Status.slice(1)}
      />
      {/* <td className="p-4 text-gray-700 whitespace-nowrap">
        <button 
          onClick={handleDownload}
          className={`${survey1Status === 'submitted' ? 'text-sky-500 hover:underline hover:decoration-sky-500 decoration-2' : 'text-gray-500 pointer-events-none'}`}
        >
          {survey1Status === 'submitted' ? action : 'Not available'}
        </button>
      </td> */}
      <StatusTag
        status={survey2Status.charAt(0).toUpperCase() + survey2Status.slice(1)}
      />
      {/* <td className="p-4 text-gray-700 whitespace-nowrap">
      <button 
          onClick={handleDownload}
          className={`${survey2Status === 'submitted' ? 'text-sky-500 hover:underline hover:decoration-sky-500 decoration-2' : 'text-gray-500 pointer-events-none'}`}
        >
          {survey2Status === 'submitted' ? action : 'Not available'}
        </button>
      </td> */}
    </tr>
  );
}

export default TableRow;
