import React, { useState } from "react";
import { SPE2Questions } from "../../js/list";
import SPEContent from "../SPEContent";

function SPEOne() {
  const [fsValue, setFsValue] = useState([]);

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
      SPEQuestions={SPE2Questions}
      formNumber={2}
    />
  );
}

export default SPEOne;
