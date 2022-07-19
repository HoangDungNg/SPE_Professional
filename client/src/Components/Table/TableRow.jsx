import React from "react";
import sendSPE1Email from "../../js/sendSPE1Email";
import sendSPE2Email from "../../js/sendSPE2Email";
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
      <td className="p-4 text-gray-700 whitespace-nowrap">
        <button
          onClick={() => sendSPE1Email(name, email, "Self & Peer Evaluation 1 not submitted")}
          className={`${survey1Status !== 'submitted' ? 'text-sky-500 hover:underline hover:decoration-sky-500 decoration-2' : 'text-gray-500 pointer-events-none'}`}
        >
          Send Email
        </button>
      </td>
      {survey2Status ? 
      <StatusTag
        status={survey2Status.charAt(0).toUpperCase() + survey2Status.slice(1)}
      />
      : "No status"}
      <td className="p-4 text-gray-700 whitespace-nowrap">
      <button 
          onClick={() => sendSPE2Email(name, email, "Self & Peer Evaluation 2 not submitted")}
          className={`${survey2Status !== 'submitted' ? 'text-sky-500 hover:underline hover:decoration-sky-500 decoration-2' : 'text-gray-500 pointer-events-none'}`}
        >
          Send Email
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
