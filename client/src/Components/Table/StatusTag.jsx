import React from 'react'

function Status({status}) {
  return (
    <td className="p-4 whitespace-nowrap">
      <strong className={`${status === 'Submitted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} px-3 py-1.5 rounded text-xs font-medium`}>
      {status}
      </strong>
    </td>
  )
}

export default Status