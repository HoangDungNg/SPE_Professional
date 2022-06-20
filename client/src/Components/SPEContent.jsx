import React, { useEffect, useState } from "react";
import Card from "./Card/Card";
import IntroCard from "./Card/IntroCard";
import EachStudSPE from "./EachStudSPE";

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

  //When the page is re-rendered, set the default state of cardID to show 1st page of form
  useEffect(() => {
    setCardID(0)
  }, [unitCode])

  const [cardID, setCardID] = useState(0);
  const [noOfStudents, setNoOfStudents] = useState(emptyStudArr);

  //When use clicks next button automatically go to top of page
  useEffect(() => {
    scrollUp()
  },[cardID])

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
    } else if(cardID >= 2) {
      const studForm = noOfStudents.map((student, index) => (
        // console.log(index+2)
        <EachStudSPE
          key={index}
          SPEQuestions={SPEQuestions}
          handleChange={handleChange}
          fsValue={fsValue}
          student={`student${index+1}`}
          id={index}
        />
      ));
      return studForm[cardID - 1];
    }
  }

  function scrollUp(){
    document.getElementById("SPEContent").scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="flex flex-[80] h-screen justify-center overflow-auto scroll-smooth" id="SPEContent">
      <div className="flex items-center flex-col p-10 ">
        <div className=" p-8 pt-0 flex flex-col items-center border-black-100 border-2">
          {/* <IntroCard SPENumber={formNumber} unitCode={unitCode} /> */}
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
                      onClick={() => {setCardID((currPage) => currPage - 1); scrollUp()}}
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
                      onClick={() => {setCardID((currPage) => currPage + 1); scrollUp()}}
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
                      onClick={handleSubmit}
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
    </div>
  );
}

export default SPEContent;
