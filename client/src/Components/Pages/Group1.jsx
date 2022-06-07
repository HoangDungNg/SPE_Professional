import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import TableRow from "../Table/TableRow";

function Group1() {
  const user = useSelector(selectUser);
  const [group, setGroup] = useState("");
    const [members, setMembers] = useState("");
    const [userInfo, setUserInfo] = useState(""); //Store "Users" table
    


  useEffect(() => {
    try {
      db.collection("groups")
        .doc("group1")
        .get()
        .then((doc) => {
          if (doc.exists) {
            // console.log(doc.data());
            setGroup(doc.data());
            // doc.data()
            var memberResult = doc.data().members;
            setMembers((members) => [...members, memberResult])
            // return memberIDResult;
          }
        })

        
        // .then((memberIDResult) => {
            // console.log("All member's ID " + memberIDResult);
            // memberID.map((id) => {
                // console.log({ [id]: value })
                // console.log(id)
                // console.log(value)
                // return db.collection("users").doc(id).get().then(doc => {
                //     if (doc.exists) {
                //         console.log(doc.data());
                //         // setMemberID((result) => [...result,doc.data()])
                //         // setResult(result => [...result, response]);
                //     }
                // })
            // })
            
        // })
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    members[0]?.map((member) => {
        // return console.log(member)
        return db.collection("users").doc(member.id).get().then(doc => {
            // if(!doc.exist) return
            if(doc.exists){
                // console.log(doc.data());
                setUserInfo((userInfo) => [...userInfo, doc.data()]);
            }
            
            // setMembers((members) => [...members,doc.data()])
            // setResult(result => [...result, response]);
            
        })
    })
  }, [members])

  return (
    <div className="flex flex-[80] h-screen justify-center overflow-auto">
        <div className="p-10">

        
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm divide-y divide-gray-200 bg-white rounded-md">
          <thead>
            <tr>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                <div className="flex items-center">
                  Name
                  
                </div>
              </th>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                <div className="flex items-center">
                  Email Address
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 ml-1.5 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </th>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                <div className="flex items-center">
                  Status
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 ml-1.5 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </th>
              <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                <div className="flex items-center">
                  Group
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 ml-1.5 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </th>             
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            
            {/* {members && members[0].map((member) => console.log("Member id: " + member.id + "\nMember Name: " + member.name)) } */}
            {userInfo && console.log(userInfo)}
            {userInfo && 
                userInfo.map((member, index) => {
                    return <TableRow key={index} name={member.name} email={member.email} status={"Submitted"} group={member.group} />
                })
            }         
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default Group1;
