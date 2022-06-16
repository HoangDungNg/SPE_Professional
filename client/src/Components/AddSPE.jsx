import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { CgRemove, CgAdd } from "react-icons/cg";

function AddSPE({ speFormName, speNo }) {
  const [unitCode, setUnitCode] = useState("");

  const ratingQArr = [
    {
      id: 1,
      name: "question",
      className: "rating p-3",
      value: "",
      inputType: "fieldset",
    },
    {
      id: 2,
      name: "question",
      className: "rating p-3",
      value: "",
      inputType: "fieldset",
    },
    {
      id: 3,
      name: "question",
      className: "rating p-3",
      value: "",
      inputType: "fieldset",
    },
    {
      id: 4,
      name: "question",
      className: "rating p-3",
      value: "",
      inputType: "fieldset",
    },
    {
      id: 5,
      name: "question",
      className: "rating p-3",
      value: "",
      inputType: "fieldset",
    },
  ];

  const inputQArr = [
    {
      id: 1,
      name: "question",
      className: "input p-3",
      value: "",
      inputType: "textarea",
    },
    {
      id: 2,
      name: "question",
      className: "input p-3",
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
      .where("trimesterCode", "==", "TMA2022")
      .get()
      .then((snapshot) => {
        const [docID] = snapshot.docs.map((doc) => doc.id);
        return docID;
      })
      .then((docID) => {
        if(docID === undefined){
          console.log("Doc ID not found, data added to firebase")
          db.collection(speFormName)
          .doc(docID)
          .set({
            unitCode: unitCode,
            trimesterCode: "TMA2022",
            questions: allQuestionsArr.map((input) => input)
          });
        }
        else{
          console.log("Doc ID found, data updated")
          db.collection(speFormName)
          .doc(docID)
          .update({
            unitCode: unitCode,
            trimesterCode: "TMA2022",
            questions: allQuestionsArr.map((input) => input)
          });         
        }

        //Clear form input fields
        setAllQuestionsArr([])
        setRatingArr(ratingQArr)
        setInputArr(inputQArr)
        setUnitCode("")

      });
  }, [allQuestionsArr])

  const addRatingInput = () => {
    setRatingArr((s) => {
      return [
        ...s,
        {
          name: "question",
          className: "rating p-3",
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
          className: "input p-3",
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

  return (
    <div className="flex flex-[80] h-screen justify-center overflow-auto">
      <div className=" w-full pb-10 overflow-auto">
        <div className="bg-[#E12945] text-white h-10 flex justify-center items-center">
          <h2>Add/Update SPE {speNo} form</h2>
        </div>

        <div className="px-32 pb-32 pt-24">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center">
              <h2 className="flex font-bold pb-10">
                Accessment questions (Rating questions)
              </h2>
              <div className="flex p-3">
                <span className="pr-3">Unit code: </span>
                <input
                  className="mr-7 p-3"
                  onChange={(e) => setUnitCode(e.target.value)}
                  value={unitCode}
                  size="50"
                  placeholder="Please enter the unit code (Eg.ICT302)"
                />
              </div>
              {ratingArr.map((item, i) => {
                return (
                  <div className="flex flex-row p-3 ">
                    {/* display: flex, justify-content:center; align-items:center; */}
                    <span className="mr-3">Question {i + 1}: </span>
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
                    <br />
                    <br />
                  </div>
                );
              })}

              <br />

              <button type="button" onClick={addRatingInput} className="">
                <span className="text-lg font-medium hover:font-bold">
                  <CgAdd
                    size={25}
                    className="inline-block text-green-600 rounded-full hover:text-white hover:bg-green-600 active:bg-green-500 focus:outline-none focus:ring"
                  />{" "}
                  Add more
                </span>
              </button>
            </div>

            <div className="flex flex-col items-center mt-24">
              <h2 className="flex font-bold pb-10">
                Description questions (Text input questions)
              </h2>
              {inputArr.map((item, i) => {
                return (
                  <div className="flex flex-row p-3">
                    <span className="mr-3">Question {i + 1}: </span>
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
                );
              })}

              <br />
              <button type="button" onClick={addInput} className="">
                <span className="text-lg font-medium hover:font-bold">
                  <CgAdd
                    size={25}
                    className="inline-block text-green-600 rounded-full hover:text-white hover:bg-green-600 active:bg-green-500 focus:outline-none focus:ring"
                  />{" "}
                  Add more
                </span>
              </button>
            </div>
            <br />
            <br />
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
  );
}

export default AddSPE;
