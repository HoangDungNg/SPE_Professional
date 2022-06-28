import React, { useEffect, useState } from "react";
import Card from "./Card/Card";
import IntroCard from "./Card/IntroCard";
import EachStudSPE from "./EachStudSPE";
import toast, { Toaster } from "react-hot-toast";

function SPEContent({
  SPEQuestions,
  handleSubmit,
  handleChange,
  formNumber,
  unitCode,
  nameOfUser,
  studentID,
  fsValue,
}) {
  const emptyStudArr = [
    {
      studentNo: "",
      studentName: "",
    },
    {
      studentNo: "",
      studentName: "",
    },
    {
      studentNo: "",
      studentName: "",
    },
    {
      studentNo: "",
      studentName: "",
    },
    {
      studentNo: "",
      studentName: "",
    },
    {
      studentNo: "",
      studentName: "",
    },
  ];

  const sucessMsg = (msg, toastHandler = toast) => {
    toastHandler.success(msg, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  //When the page is re-rendered, set the default state of cardID to show 1st page of form
  useEffect(() => {
    setCardID(0);
  }, [unitCode]);

  const [cardID, setCardID] = useState(0);
  const [noOfStudents, setNoOfStudents] = useState(emptyStudArr);

  //When use clicks next button automatically go to top of page
  useEffect(() => {
    scrollUp();
  }, [cardID]);

  function formDisplay() {
    if (cardID === 0) {
      return <IntroCard SPENumber={formNumber} unitCode={unitCode} />;
    } else if (cardID === 1) {
      return (
        <EachStudSPE
          SPEQuestions={SPEQuestions}
          handleChange={handleChange}
          nameOfUser={nameOfUser}
          studentID={studentID}
          student={"student1"}
        />
      );
    } else if (cardID >= 2) {
      const studForm = noOfStudents.map((student, index) => (
        // console.log(index+2)
        <EachStudSPE
          key={index}
          SPEQuestions={SPEQuestions}
          handleChange={handleChange}
          fsValue={fsValue}
          student={`student${index + 1}`}
          id={index}
        />
      ));
      return studForm[cardID - 1];
    }
  }

  function scrollUp() {
    document.getElementById("SPEContent").scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleNextClick(e) {
    if (cardID === 0) {
      setCardID((currPage) => currPage + 1);
      scrollUp();
    }

    if (cardID === 1) {
      fsValue.student1q1Rating === undefined ||
      fsValue.student1q2Rating === undefined ||
      fsValue.student1q3Rating === undefined ||
      fsValue.student1q4Rating === undefined ||
      fsValue.student1q5Rating === undefined ||
      fsValue.student1q6txtarea === undefined ||
      fsValue.student1q7txtarea === undefined
        ? alert("Please fill up all the fields")
        : setCardID((currPage) => currPage + 1);
      scrollUp();
    } else if (cardID === 2) {
      fsValue.student2q1Rating === undefined ||
      fsValue.student2q2Rating === undefined ||
      fsValue.student2q3Rating === undefined ||
      fsValue.student2q4Rating === undefined ||
      fsValue.student2q5Rating === undefined ||
      fsValue.student2q6txtarea === undefined ||
      fsValue.student2q7txtarea === undefined
        ? alert("Please fill up all the fields")
        : setCardID((currPage) => currPage + 1);
      scrollUp();
    } else if (cardID === 3) {
      console.log("card 3 triggered");
      fsValue.student3q1Rating === undefined ||
      fsValue.student3q2Rating === undefined ||
      fsValue.student3q3Rating === undefined ||
      fsValue.student3q4Rating === undefined ||
      fsValue.student3q5Rating === undefined ||
      fsValue.student3q6txtarea === undefined ||
      fsValue.student3q7txtarea === undefined
        ? alert("Please fill up all the fields")
        : setCardID((currPage) => currPage + 1);
      scrollUp();
    } else if (cardID === 4) {
      fsValue.student4q1Rating === undefined ||
      fsValue.student4q2Rating === undefined ||
      fsValue.student4q3Rating === undefined ||
      fsValue.student4q4Rating === undefined ||
      fsValue.student4q5Rating === undefined ||
      fsValue.student4q6txtarea === undefined ||
      fsValue.student4q7txtarea === undefined
        ? alert("Please fill up all the fields")
        : setCardID((currPage) => currPage + 1);
      scrollUp();
    } else if (cardID === 5) {
      fsValue.student5q1Rating === undefined ||
      fsValue.student5q2Rating === undefined ||
      fsValue.student5q3Rating === undefined ||
      fsValue.student5q4Rating === undefined ||
      fsValue.student5q5Rating === undefined ||
      fsValue.student5q6txtarea === undefined ||
      fsValue.student5q7txtarea === undefined
        ? alert("Please fill up all the fields")
        : setCardID((currPage) => currPage + 1);
      scrollUp();
    } else if (cardID === 6) {
      console.log(fsValue);
      fsValue.student6q1Rating === undefined ||
      fsValue.student6q2Rating === undefined ||
      fsValue.student6q3Rating === undefined ||
      fsValue.student6q4Rating === undefined ||
      fsValue.student6q5Rating === undefined ||
      fsValue.student6q6txtarea === undefined ||
      fsValue.student6q7txtarea === undefined
        ? (() => alert("Please fill up all the fields"))()
        : (() => {
            handleSubmit(e);
            setCardID(0);
            sucessMsg(`Self & Peer Evaluation ${formNumber} form submitted!`);
          })();
    }
  }

  return (
      <div className="flex items-center flex-col overflow-auto scroll-smooth pb-10" id="SPEContent">
        <div className="flex justify-center w-full items-center bg-[#E12945] h-10 p-2 text-white">
          <h2>Self & Peer Evaluation form {formNumber}</h2>
        </div>
        <div className=" p-8 flex flex-col items-center">

          <div id="SPEContainer" className="flex flex-col items-center">
            <div id="cards">
              <form
                action=""
                onSubmit={handleSubmit}
                className="w-full"
                method="post"
                encType="multipart/form-data"
                id="myForm1"
              >
                {formDisplay()}

                <div
                  id="btnContainer"
                  className={`flex flex-row w-3/5 my-4 mx-auto ${
                    cardID === 0 ? "justify-center" : "justify-between"
                  } `}
                >
                  {cardID === 0 ? null : (
                    <button
                      type="button"
                      onClick={() => {
                        setCardID((currPage) => currPage - 1);
                        scrollUp();
                      }}
                      disabled={cardID === 0}
                      className="relative inline-flex items-center px-8 py-3 overflow-hidden text-white bg-[#5C7B88] rounded group  focus:outline-none focus:ring"
                    >
                      <span className="absolute left-0 transition-transform -translate-x-full group-hover:translate-x-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-arrow-narrow-left"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <line x1="5" y1="12" x2="9" y2="16"></line>
                          <line x1="5" y1="12" x2="9" y2="8"></line>
                        </svg>
                      </span>
                      <span className="text-sm font-medium transition-all group-hover:ml-4">
                        Prev
                      </span>
                    </button>
                  )}

                  {cardID !== 6 ? (
                    <button
                      type="button"
                      onClick={handleNextClick}
                      className="relative inline-flex items-center px-8 py-3 overflow-hidden text-white bg-[#5C7B88] rounded group focus:outline-none focus:ring"
                    >
                      <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-arrow-narrow-right"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <line x1="15" y1="16" x2="19" y2="12"></line>
                          <line x1="15" y1="8" x2="19" y2="12"></line>
                        </svg>
                      </span>
                      <span className="text-sm font-medium transition-all group-hover:mr-4">
                        Next
                      </span>
                    </button>
                  ) : (
                    <button
                      // type="submit"
                      type="button"
                      onClick={(e) => handleNextClick(e)}
                      className="relative inline-flex items-center px-8 py-3 overflow-hidden text-white bg-[#5C7B88] rounded group focus:outline-none focus:ring"
                    >
                      <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                      <span className="text-sm font-medium transition-all group-hover:mr-4">
                        Submit
                      </span>
                    </button>
                  )}
                </div>

                {/* <button
                  type="submit"
                  className="relative inline-flex items-center px-8 py-3 overflow-hidden text-white bg-[#5C7B88] rounded group focus:outline-none focus:ring"
                >
                  <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                  <span className="text-sm font-medium transition-all group-hover:mr-4">
                    Submit
                  </span>
                </button> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
}

export default SPEContent;
