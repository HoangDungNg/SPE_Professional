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

  return (
    <tr>
      <td className="p-4 text-gray-700 whitespace-nowrap">{group}</td>
      <td className="p-4 text-gray-700 whitespace-nowrap">{teamName ? teamName 
      : 
       <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded text-xs font-medium">Team name not added yet</span>}</td> 
      <td className="p-4 font-medium whitespace-nowrap">{memberId}</td>
      <td className="p-4 font-medium whitespace-nowrap">{name}</td>
      <td className="p-4 text-gray-700 whitespace-nowrap">{email}</td>
      {survey1Status ? 
      <StatusTag
        status={survey1Status.charAt(0).toUpperCase() + survey1Status.slice(1)}
      />: "No status"}
      {/* <td className="p-4 text-gray-700 whitespace-nowrap">
        <button 
          onClick={handleDownload}
          className={`${survey1Status === 'submitted' ? 'text-sky-500 hover:underline hover:decoration-sky-500 decoration-2' : 'text-gray-500 pointer-events-none'}`}
        >
          {survey1Status === 'submitted' ? action : 'Not available'}
        </button>
      </td> */}
      {survey2Status ? 
      <StatusTag
        status={survey2Status.charAt(0).toUpperCase() + survey2Status.slice(1)}
      />
      : "No status"}
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
