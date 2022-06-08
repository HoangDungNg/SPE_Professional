import React from "react";
import StatusTag from "./StatusTag";

function TableRow({ name, email, survey1Status, survey2Status, group }) {
  return (
    <tr>
      <td className="p-4 font-medium whitespace-nowrap">{name}</td>
      <td className="p-4 text-gray-700 whitespace-nowrap">{email}</td>
      <StatusTag status={survey1Status.charAt(0).toUpperCase() + survey1Status.slice(1)} />
      <StatusTag status={survey2Status.charAt(0).toUpperCase() + survey2Status.slice(1)} />
      <td className="p-4 text-gray-700 whitespace-nowrap">{group}</td>
    </tr>
  );
}

export default TableRow;
