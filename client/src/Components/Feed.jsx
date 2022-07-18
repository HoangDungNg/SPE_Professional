import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice.js";

function Feed() {
  const user = useSelector(selectUser);
  const [feed, setFeed] = useState([]);
  const [allFeed, setAllFeed] = useState([]);
  const [userDetails, setUserDetails] = useState({});


  useEffect(() => {

    try {
      db.collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => {
        if(doc.exists){

          const roleData = doc.data().role;
          const unitCode = doc.data().attendingUnits

          setUserDetails({
            role: roleData
          })
          
          return unitCode
        }
      })
      .then((unitCode) => {

        if(unitCode) {
          //If lecturer is teaching more than 1 unit, loop thru it
          unitCode.forEach((unit) => {
            db.collection("feed")
            .where("unitCode", "==", unit)
            .onSnapshot((snapshot) => {
              const data = snapshot.docs.map((doc) => doc.data())

              //Set each student submission doc
              data.forEach((doc) => {
                setAllFeed((prev) => [...prev, doc]);
              })

            });
          })
        }
        
      })

      
      
    } catch (err) {
      console.log(err);
    }
  }, []);

  //UseEffect for sorting all feed items
  useEffect(() => {
    if(!allFeed) return;

    const sorted = allFeed.sort(function(a,b){
      return new Date(b.timestamp.toDate()) - new Date(a.timestamp.toDate());
    });


    setFeed(sorted)
  }, [allFeed])
  

  return (
    <div className=" mb-4 bg-white rounded-lg max-h-[46.875rem] overflow-auto divide-y divider-gray-200 scrollbar">
      {
        feed.length !== 0 ?
          feed.map((eachFeed, index) => (
            <div className="flex flex-row bg-white p-2" key={index}>
              <Avatar className="block items-center m-2 sm:flex" />

              <div className="text-gray-600 m-2">
                <div className="text-base font-normal flex flex-col">
                  <div className="text-left">
                    <span className="font-semibold">{eachFeed.studentName}</span>
                    <span className="font-medium text-gray-900">
                      &nbsp;from {eachFeed.unitCode} class {eachFeed.classCode}{" "}
                      submitted {eachFeed.submission}.
                    </span>
                  </div>

                  <span className="text-right text-xs font-normal text-gray-500">
                    {new Date(
                      eachFeed.timestamp.seconds * 1000
                    ).toLocaleDateString()}
                    &nbsp;&nbsp;
                    {new Date(
                      eachFeed.timestamp.seconds * 1000
                    ).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          ))
          : userDetails.role === 'lecturer' ?
          <div className="bg-white p-4">
              <div className="text-gray-600 m-2 flex flex-col">
                <span className="font-semibold">No recent activities update available yet</span>
                <span className="text-sm font-normal">(Might be because student have not submitted any SPE yet)</span>
              </div>
          </div>

          :

          <div className="bg-white p-4">
              <div className="text-gray-600 m-2 flex flex-col">
                <span className="font-semibold">Recent activities only available for lecturers only</span>
              </div>
          </div>
      }
    </div>
  );
}

export default Feed;
