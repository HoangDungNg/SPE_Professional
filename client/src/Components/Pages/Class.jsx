import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import TableRow from "../Table/TableRow";
import { Link, useParams } from "react-router-dom";
import TableHead from "../Table/TableHead";
import SectionButton from "../HomeComponents/SectionButton";

function Class({ userInfo, groupName, groupNum }) {
  const user = useSelector(selectUser);
  const { unitId, classId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [finalResult, setFinalResult] = useState([]);
  // const [studentAns, setStudentAns] = useState([]);

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

  useEffect(() => {
    db.collection("spe1submissions")
      .where("unitCode", "==", unitId)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());

        let ansAllInfoArr = [];
        var result;
        
        for(var i = 0; i < data.length; i++) {
          processStud(i)
        }      

        function processStud(index){

          let ansInfoArr = [];

          for (var IDkey in data[index].answers) {
            if (IDkey.includes("ID")) {
              ansInfoArr.push({ [IDkey]: data[index].answers[IDkey], teamCode: data[index].teamCode });
            }
          }

          for (var nameKey in data[index].answers) {

            if (nameKey.includes("student1Name")) {            

              for(var j = 0; j < ansInfoArr.length; j++){
                if(ansInfoArr[j].student1ID){
                  ansInfoArr[j].student1Name = data[index].answers[nameKey]                
                }
              }
            }
            else if(nameKey.includes("student2Name")){


              for(var k = 0; k < ansInfoArr.length; k++){
                if(ansInfoArr[k].student2ID){
                  ansInfoArr[k].student2Name = data[index].answers[nameKey]
                }
              }
            }
            else if(nameKey.includes("student3Name")){

              for(var l = 0; l < ansInfoArr.length; l++){
                if(ansInfoArr[l].student3ID){
                  ansInfoArr[l].student3Name = data[index].answers[nameKey]
                }
              }
            }
            else if(nameKey.includes("student4Name")){

              for(var m = 0; m < ansInfoArr.length; m++){
                if(ansInfoArr[m].student4ID){
                  ansInfoArr[m].student4Name = data[index].answers[nameKey]
                }
              }
            }
            else if(nameKey.includes("student5Name")){

              for(var n = 0; n < ansInfoArr.length; n++){
                if(ansInfoArr[n].student5ID){
                  ansInfoArr[n].student5Name = data[index].answers[nameKey]
                }
              }
            }
            else if(nameKey.includes("student6Name")){

              for(var o = 0; o < ansInfoArr.length; o++){
                if(ansInfoArr[o].student6ID){
                  ansInfoArr[o].student6Name = data[index].answers[nameKey]
                }
              }
            }
          }
          
          for (var avgKey in data[index].answers) {

            if (avgKey.includes("student1Avg")) {

              for(var j = 0; j < ansInfoArr.length; j++){
                if(ansInfoArr[j].student1ID){
                  ansInfoArr[j].student1Avg = data[index].answers[avgKey]
                }
              }
            }
            else if(avgKey.includes("student2Avg")){

              for(var k = 0; k < ansInfoArr.length; k++){
                if(ansInfoArr[k].student2ID){
                  ansInfoArr[k].student2Avg = data[index].answers[avgKey]
                }
              }
            }
            else if(avgKey.includes("student3Avg")){

              for(var l = 0; l < ansInfoArr.length; l++){
                if(ansInfoArr[l].student3ID){
                  ansInfoArr[l].student3Avg = data[index].answers[avgKey]
                }
              }
            }
            else if(avgKey.includes("student4Avg")){

              for(var m = 0; m < ansInfoArr.length; m++){
                if(ansInfoArr[m].student4ID){
                  ansInfoArr[m].student4Avg = data[index].answers[avgKey]
                }
              }
            }
            else if(avgKey.includes("student5Avg")){

              for(var n = 0; n < ansInfoArr.length; n++){
                if(ansInfoArr[n].student5ID){
                  ansInfoArr[n].student5Avg = data[index].answers[avgKey]
                }
              }
            }
            else if(avgKey.includes("student6Avg")){

              for(var o = 0; o < ansInfoArr.length; o++){
                if(ansInfoArr[o].student6ID){
                  ansInfoArr[o].student6Avg = data[index].answers[avgKey]
                }
              }
            }
          }

          ansInfoArr.forEach((item) => {
            for (let i = 1; i < 7; i++) {
              const obj = {
                ...item,
                studentID: item[`student${i}ID`],
                studentName: item[`student${i}Name`],
                studentAvg: item[`student${i}Avg`],
              };
              delete obj[`student${i}ID`];
              delete obj[`student${i}Name`];
              delete obj[`student${i}Avg`];
  
              if (
                obj.studentID !== undefined ||
                obj.studentName !== undefined ||
                obj.studentAvg !== undefined
              ) {
       
                ansAllInfoArr.push(obj)
                
              }
            }
          });

          // //Convert string studentAvg to number
          for(var l = 0; l < ansAllInfoArr.length; l++) {
            ansAllInfoArr[l].studentAvg = parseFloat(ansAllInfoArr[l].studentAvg)
          }

            result = [
              ...ansAllInfoArr
                .reduce((a, b) => {
                  if (a.has(b.studentID)){
                    const obj = a.get(b.studentID);
                    obj.studentAvg += b.studentAvg;
                    a.set(b.studentID, obj);
                  } 
                  else {
                    a.set(b.studentID, {
                      studentID: b.studentID,                 
                      studentName: b.studentName,
                      studentAvg: b.studentAvg,
                      teamCode: b.teamCode
                    });
                  }
                  return a;
                }, new Map())
                .values(),
            ];
        }

        //Calculate average score of each students
        result.forEach(student => {
          if(student['studentAvg']){
            student.studentAvg = (student.studentAvg / 6).toFixed(2)
          }
        })

        console.log(result)

        setFinalResult(result);
      });
  },[unitId]);

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

                {
                students && (
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
          <section>
            <div className=" px-4 pt-16 pb-28 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 sm:grid-cols-3">
                <SectionButton
                  title={"Download output file (only available after due date)"}
                  link={"/downloadSpe"}
                  content={"Download is only available after the due date you have set."}
                  finalResult={finalResult}
                  unitCode={unitId}
                />
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Class;
