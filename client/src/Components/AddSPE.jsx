import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { CgRemove, CgAdd } from "react-icons/cg";

function AddSPE({ speFormName, speNo }) {
  const [unitCode, setUnitCode] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [trimesterCode, setTrimesterCode] = useState("");

  const ratingQArr = [
    {
      id: 1,
      name: "question",
      className:
        "rating p-3 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40",
      value: "",
      inputType: "fieldset",
    },
    {
      id: 2,
      name: "question",
      className:
        "rating p-3 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40",
      value: "",
      inputType: "fieldset",
    },
    {
      id: 3,
      name: "question",
      className:
        "rating p-3 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40",
      value: "",
      inputType: "fieldset",
    },
    {
      id: 4,
      name: "question",
      className:
        "rating p-3 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40",
      value: "",
      inputType: "fieldset",
    },
    {
      id: 5,
      name: "question",
      className:
        "rating p-3 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40",
      value: "",
      inputType: "fieldset",
    },
  ];

  const inputQArr = [
    {
      id: 1,
      name: "question",
      className:
        "input p-3 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40",
      value: "",
      inputType: "textarea",
    },
    {
      id: 2,
      name: "question",
      className:
        "input p-3 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40",
      value: "",
      inputType: "textarea",
    },
  ];

  const [ratingArr, setRatingArr] = useState(ratingQArr);
  const [inputArr, setInputArr] = useState(inputQArr);
  const [allQuestionsArr, setAllQuestionsArr] = useState([]);

  //When allQuestionsArr is set when submit button is clicked useEffect runs
  useEffect(() => {
    if (allQuestionsArr.length === 0) return;

    //Add to firebase
    db.collection(speFormName)
      .where("unitCode", "==", unitCode)
      .where("trimesterCode", "==", trimesterCode)
      .get()
      .then((snapshot) => {
        const [docID] = snapshot.docs.map((doc) => doc.id);
        return docID;
      })
      .then((docID) => {
        if (docID === undefined) {
          console.log("Doc ID not found, data added to firebase");
          db.collection(speFormName)
            .doc(docID)
            .set({
              unitCode: unitCode,
              trimesterCode: trimesterCode,
              dueDate: dueDate,
              questions: allQuestionsArr.map((input) => input),
            });
        } else {
          console.log("Doc ID found, data updated");
          db.collection(speFormName)
            .doc(docID)
            .update({
              unitCode: unitCode,
              trimesterCode: trimesterCode,
              dueDate: dueDate,
              questions: allQuestionsArr.map((input) => input),
            });
        }

        //Clear form input fields
        setAllQuestionsArr([]);
        setRatingArr(ratingQArr);
        setInputArr(inputQArr);
        setUnitCode("");
        setTrimesterCode("");
        setDueDate("");
      });
  }, [allQuestionsArr]);

  const addRatingInput = () => {
    setRatingArr((s) => {
      return [
        ...s,
        {
          name: "question",
          className:
            "rating p-3 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40",
          value: "",
          inputType: "fieldset",
        },
      ];
    });
  };

  const addInput = () => {
    setInputArr((s) => {
      return [
        ...s,
        {
          name: "question",
          className:
            "input p-3 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40",
          value: "",
          inputType: "textarea",
        },
      ];
    });
  };

  const removeRatingInput = (i) => {
    const list = [...ratingArr];
    list.splice(i, 1);
    setRatingArr(list);
  };

  const removeInput = (i) => {
    const list = [...inputArr];
    list.splice(i, 1);
    setInputArr(list);
  };

  const handleChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    if (e.target.className.includes("rating")) {
      setRatingArr((s) => {
        const newArr = s.slice();
        newArr[index].value = e.target.value;
        return newArr;
      });
    } else if (e.target.className.includes("input")) {
      setInputArr((s) => {
        const newArr = s.slice();
        newArr[index].value = e.target.value;
        return newArr;
      });
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    ratingArr.map((field) => {
      setAllQuestionsArr((prevItem) => {
        return [
          ...prevItem,
          { question: field.value, inputType: field.inputType },
        ];
      });
    });

    inputArr.map((field) => {
      setAllQuestionsArr((prevItem) => {
        return [
          ...prevItem,
          { question: field.value, inputType: field.inputType },
        ];
      });
    });
  }

  function handleUpdateDueDate(e) {
    e.preventDefault();

    db.collection(speFormName)
      .where("unitCode", "==", unitCode)
      .where("trimesterCode", "==", "TMA2022")
      .get()
      .then((snapshot) => {
        const [docID] = snapshot.docs.map((doc) => doc.id);
        console.log(docID);
        return docID;
      })
      .then((docID) => {
        db.collection(speFormName).doc(docID).update({
          dueDate: dueDate,
        });

        //Clear form input fields
        setAllQuestionsArr([]);
        setRatingArr(ratingQArr);
        setInputArr(inputQArr);
        setUnitCode("");
        setDueDate("");
      });
  }

  return (
    <div className="flex flex-[80] h-screen justify-center overflow-auto">
      <div className=" w-full pb-10 overflow-auto">
        <div className="bg-[#E12945] text-white h-10 flex justify-center items-center sticky top-0">
          <h2>Add/Update SPE {speNo} form</h2>
        </div>

        {/* <div className="px-32 pb-32 pt-24"> */}
        <div className="flex items-center p-8">
          <div className="mt-6 w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md">
            <h2 className="text-3xl font-semibold text-center text-gray-800">
              Add/Update SPE {speNo} form
            </h2>
            <p className="mt-3 text-left text-gray-600">
              Please enter the unit code without spacing (eg. ICT302), and enter
              your questions accordingly. The questions can be added or removed
              according to your choice, minimum 1 question for both rating
              question and text input question.
            </p>
            <p className="mt-3 text-left text-gray-600">
              <strong>Please note: </strong>
              If you want to only update the due date of Self and Peer
              Evaluation form please type in the unit code, select the due date
              and press on "Update due date" button only.
            </p>
            <form className="mt-6 items-center md:flex flex-col">
              <h2 className="flex font-bold mt-4">
                Accessment questions (Rating questions)
              </h2>
              <p className="my-6 text-left text-gray-600 ">
                The questions under this section will be generated into rating
                questions , the scale of rating questions will be 1-5
              </p>

              <div className="flex flex-col w-full">
                <span className="block text-left mb-2 text-sm font-semibold text-gray-600">
                  Unit code:{" "}
                </span>
                <input
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => setUnitCode(e.target.value)}
                  value={unitCode}
                  size="50"
                  placeholder="Please enter the unit code (Eg.ICT302)"
                />

                <span className="block text-left my-4 text-sm font-semibold text-gray-600">
                  Due date:{" "}
                </span>
                <div className="flex flex-row justify-evenly">
                  <input
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={(e) => setDueDate(e.target.value)}
                    value={dueDate}
                    type="date"
                    placeholder="Please enter the unit code (Eg.ICT302)"
                  />

                  <button
                    // type="submit"
                    type="button"
                    onClick={(e) => handleUpdateDueDate(e)}
                    className="relative ml-5 p-2 inline-flex items-center overflow-hidden text-white bg-[#5C7B88] rounded group focus:outline-none focus:ring"
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
                      Update due date
                    </span>
                  </button>
                </div>
                <span className="block text-left my-2 text-sm font-semibold text-gray-600">
                  Trimester code:
                </span>
                <input
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => setTrimesterCode(e.target.value)}
                  value={trimesterCode}
                  size="50"
                  placeholder="Please enter the trimester code without spacing (Eg.TMA2022)"
                />
                {/* </div> */}
                {ratingArr.map((item, i) => {
                  return (
                    <div className="flex flex-col w-full" key={i}>
                      <span className="block text-left my-4 text-sm font-semibold text-gray-600">
                        Question {i + 1}:{" "}
                      </span>

                      <div className="flex flex-row justify-evenly">
                        <textarea
                          name={item.name}
                          onChange={handleChange}
                          value={item.value}
                          id={i}
                          className={item.className}
                          rows="4"
                          cols="50"
                          placeholder="Please type in the question"
                        />
                        &nbsp;&nbsp;
                        {ratingArr.length > 1 && (
                          <button
                            type="button"
                            className="inline-block text-red-600 h-6 rounded-full hover:bg-rounded-full hover:text-white hover:bg-red-600 active:bg-red-500 focus:outline-none focus:ring"
                            onClick={() => removeRatingInput(i)}
                          >
                            <CgRemove
                              size={24}
                              className=""
                              onClick={() => removeRatingInput(i)}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                <button type="button" onClick={addRatingInput} className="my-4">
                  <span className="text-lg font-medium hover:font-bold">
                    <CgAdd
                      size={25}
                      className="inline-block text-green-600 rounded-full hover:text-white hover:bg-green-600 active:bg-green-500 focus:outline-none focus:ring"
                    />{" "}
                    Add more
                  </span>
                </button>
              </div>

              <div className="flex flex-col w-full items-center">
                <h2 className="flex font-bold mt-10">
                  Description questions (Text input questions)
                </h2>
                <p className="my-6 text-left text-gray-600 ">
                  The questions under this section will be generated into text
                  input questions.
                </p>
                {inputArr.map((item, i) => {
                  return (
                    <div className="flex flex-col w-full" key={i}>
                      <span className="block text-left my-4 text-sm font-semibold text-gray-600">
                        Question {i + 1}:{" "}
                      </span>

                      <div className="flex flex-row justify-evenly">
                        <textarea
                          name={item.name}
                          onChange={handleChange}
                          value={item.value}
                          id={i}
                          type={item.type}
                          className={item.className}
                          rows="4"
                          cols="50"
                          placeholder="Please type in the question"
                        />
                        &nbsp;&nbsp;
                        {inputArr.length > 1 && (
                          <button
                            type="button"
                            className="inline-block text-red-600 h-6 rounded-full hover:bg-rounded-full hover:text-white hover:bg-red-600 active:bg-red-500 focus:outline-none focus:ring"
                            onClick={() => removeInput(i)}
                          >
                            <CgRemove
                              size={24}
                              className=""
                              onClick={() => removeInput(i)}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                <button type="button" onClick={addInput} className="my-4">
                  <span className="text-lg font-medium hover:font-bold">
                    <CgAdd
                      size={25}
                      className="inline-block text-green-600 rounded-full hover:text-white hover:bg-green-600 active:bg-green-500 focus:outline-none focus:ring"
                    />{" "}
                    Add more
                  </span>
                </button>
              </div>

              <button
                // type="submit"
                type="button"
                onClick={(e) => handleSubmit(e)}
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
    // </div>
  );
}

export default AddSPE;
