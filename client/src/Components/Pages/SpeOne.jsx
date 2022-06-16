import React, { useEffect, useState } from "react";
// import { SPE1Questions } from "../../js/list";
import SPEContent from "../SPEContent";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function SPEOne() {
  const [fsValue, setFsValue] = useState([]);
  const [SPEQuestions, setSPEQuestions] = useState([]);
  const [unitCode, setUnitCode] = useState("");
  const user = useSelector(selectUser);

  useEffect(() => {
    try {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const attendingUnit = doc.data().attendingUnit;
            return attendingUnit;
          }
        })
        .then((attendingUnit) => {
          db.collection("spe1")
            .where("unitCode", "==", attendingUnit)
            .where("trimesterCode", "==", "TMA2022")
            .get()
            .then((snapshot) => {
              const data = snapshot.docs.map((doc) => doc.data());
              data[0].questions.map((question) =>
                setSPEQuestions((prevItem) => [...prevItem, question])
              );
              setUnitCode(data[0].unitCode)
            });
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFsValue({ ...fsValue, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(fsValue);
  }

  return (
    <SPEContent
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      SPEQuestions={SPEQuestions}
      unitCode={unitCode}
      formNumber={1}
    />
  );
}

export default SPEOne;
