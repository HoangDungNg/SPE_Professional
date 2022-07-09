import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { db } from "../firebase";

function Feed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    try {
      db.collection("feed")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setFeed(snapshot.docs.map((doc) => doc.data()));
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className=" mb-4 bg-white rounded-lg max-h-[46.875rem] overflow-auto divide-y divider-gray-200 scrollbar">
      {feed &&
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
        ))}
    </div>
  );
}

export default Feed;
