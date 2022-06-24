import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import TableRow from "../Table/TableRow";
import { Link, useParams } from "react-router-dom";
import TableHead from "../Table/TableHead";

function Class({ userInfo, groupName, groupNum }) {
  const user = useSelector(selectUser);
  const { unitId, classId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  //Get the unit
  useEffect(() => {
    setLoading(true)
    setStudents([]);

    try {
      db.collection("teams")
        .where("unitCode", "==", unitId)
        .where("trimesterCode", "==", "TMA2022")
        .where("classCode", "==", classId)
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data());
          // console.log(data);

          if (data.length === 0) {
            setInterval(() => setLoading(false), 500);
          } 
          else if (data.length !== 0) {
            data.forEach((team) => {
              team.members.forEach((member) => {
                db.collection("users")
                  .where("studentID", "==", member.studentNo)
                  .get()
                  .then((snapshot) => {
                    const [data] = snapshot.docs.map((doc) => doc.data());

                    setStudents((prevData) => [
                      ...prevData,
                      {
                        teamName: team.teamName,
                        teamCode: team.teamCode,
                        member: data,
                      },
                    ]);
                    setLoading(false);
                  });
              });
            });
            
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, [unitId, classId]);


  if (loading) {
    return (
      <div className="flex flex-col flex-[80] h-screen justify-center overflow-auto scroll-smooth">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-[80] h-screen justify-center overflow-auto scroll-smooth">
      {students.length === 0 ? (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-[#E6ECEF]">
          <h1>No teams added yet</h1>
          <h1 className="text-9xl font-extrabold text-[#1A2238] tracking-widest">
            404
          </h1>
          <div className="bg-[#E12945] px-2 text-sm rounded rotate-12 absolute">
            Page Not Found
          </div>
          <button className="mt-5">
            <Link
              to="/"
              className="relative inline-block text-sm font-medium text-[#E12945] group active:text-orange-500 focus:outline-none focus:ring"
            >
              <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

              <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                <router-link to="/">Go Home</router-link>
              </span>
            </Link>
          </button>
        </div>
      ) : (
        <div className="flex flex-col flex-[80] h-screen overflow-auto">
          <div className="bg-[#E12945] text-white h-10 mb-14 flex justify-center items-center">
            <h2>
              {unitId} {classId} team details
            </h2>
          </div>
          <h1>
            Teams in {unitId} {classId}
          </h1>
          <div className="p-10 mb-20">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm divide-y divide-gray-200 bg-white rounded-md">
                <thead>
                  <tr>
                    <TableHead title={"Group"} />
                    <TableHead title={"Team name"} />
                    <TableHead title={"Student No."} />
                    <TableHead title={"Name"} />
                    <TableHead title={"Email"} />
                    <TableHead title={"Form 1 Status"} />
                    <TableHead title={"Form 2 Status"} />
                  </tr>
                </thead>

                {students && (
                  <tbody className="divide-y divide-gray-100">
                    {students.map((student, index) => (
                      <TableRow
                        key={index}
                        name={student.member.name}
                        email={student.member.email}
                        memberId={student.member.studentID}
                        survey1Status={student.member.survey1Status}
                        survey2Status={student.member.survey2Status}
                        group={student.teamCode}
                        teamName={student.teamName}
                      />
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Class;
