import React from 'react'

function TableRow({name, email, status, group}) {
  return (
    <tr>     
        <td className="p-4 font-medium whitespace-nowrap">{name}</td>
        <td className="p-4 text-gray-700 whitespace-nowrap">
        {email}
        </td>
        <td className="p-4 whitespace-nowrap">
        <strong className="bg-green-100 text-green-700 px-3 py-1.5 rounded text-xs font-medium">
            {status}
        </strong>
        </td>
        <td className="p-4 text-gray-700 whitespace-nowrap">
        {group}
        </td>
    </tr>
  )
}

export default TableRow