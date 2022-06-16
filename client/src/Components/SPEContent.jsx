import React from 'react'
import Card from './Card/Card';
import IntroCard from './Card/IntroCard';

function SPEContent({SPEQuestions, handleSubmit, handleChange, formNumber, unitCode}) {
  return (
    <div className="flex flex-[80] h-screen justify-center overflow-auto">
      <div className="flex items-center flex-col p-10 ">
        <div className=" p-8 pt-0 flex flex-col items-center border-black-100 border-2">
          <IntroCard SPENumber={formNumber} unitCode={unitCode} />

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
                {SPEQuestions.map((question, index) => {
                  return (
                    question.inputType === 'textarea' ? 
                    <Card
                      question={question.question}
                      inputType={question.inputType}
                      key={index}
                      id={index}
                      handleChange={handleChange}
                    />
                    : 
                    <Card
                    question={question.question}
                    inputType={question.inputType}
                    key={index}
                    id={index}
                    handleChange={handleChange}
                  />
                  );
                })}
                {/* {SPEQuestions.map((question, index) => {
                  return (
                    <Card
                      question={question.question}
                      inputType={question.inputType}
                      key={index}
                      id={index}
                      handleChange={handleChange}
                    />
                  );
                })} */}
                <button
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
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SPEContent