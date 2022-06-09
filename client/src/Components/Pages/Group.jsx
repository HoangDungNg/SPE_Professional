import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import TableRow from "../Table/TableRow";
import { useParams } from "react-router-dom";
import TableHead from "../Table/TableHead";

function Group({ userInfo, groupName, groupNum}) {
  const user = useSelector(selectUser);
  const { groupId } = useParams();

  return (
    <div className="flex flex-col flex-[80] h-screen pt-24 overflow-auto">
      {groupNum.map((num, index) => num === groupId ? <h1 key={index}>Group {groupId} <br />({groupName[num-1]})</h1> : null)}
      <div className="p-10">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200 bg-white rounded-md">
            <thead>

              <tr>
                <TableHead title={'Name'} />
                <TableHead title={'Email'} />
                <TableHead title={'Form 1 Status'} />
                <TableHead title={'Action'} /> 
                <TableHead title={'Form 2 Status'} />
                <TableHead title={'Action'} /> 
                <TableHead title={'Group'} />               
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {userInfo 
                ? userInfo.map((member, index) => { //If there userInfo map it

                  return (
                    member.group === "Group " + groupId ? //If there's member.group and groupId of nagivation useParams matches return TableRow component
                     <TableRow
                      key={index}
                      name={member.name}
                      email={member.email}
                      memberId={member.id}
                      survey1Status={member.survey1Status}
                      survey2Status={member.survey2Status}
                      group={member.group}
                      action={'Download'}
                    /> : null //Else return null if there is not matching id
                  )}
                ) : null //Else return null if there is no userInfo
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Group;
