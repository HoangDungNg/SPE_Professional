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
    <div className="flex flex-col flex-[80] h-screen justify-center overflow-auto">
      {/* {userInfo ? userInfo.map(member, index) } */}
      {/* {console.log(userInfo)} */}
      {console.log("GroupID: " + groupId)}
      {console.log("GroupNum: " + groupNum)}
      {groupId === groupNum ? <h1>Group {groupId} (groupName)</h1> : null}
      {console.log(groupId)}
      <div className="p-10">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200 bg-white rounded-md">
            <thead>

              <tr>
                <TableHead title={'Name'} />
                <TableHead title={'Email'} />
                <TableHead title={'Form 1 Status'} />
                <TableHead title={'Form 2 Status'} />
                <TableHead title={'Group'} />  
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {userInfo 
                ? userInfo.map((member, index) => {
                    if(member.group === "Group " + groupId){
                      return (
                        <TableRow
                          key={index}
                          name={member.name}
                          email={member.email}
                          survey1Status={member.survey1Status}
                          survey2Status={member.survey2Status}
                          group={member.group}
                        />
                      )
                    }
                  }) 
                : null
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Group;
