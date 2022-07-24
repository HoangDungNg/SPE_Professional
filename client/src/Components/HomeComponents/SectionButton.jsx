import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { svgIcons } from "../../js/svgIcons";
import { AiOutlineDownload } from "react-icons/ai";
import { CSVLink } from "react-csv";

function SectionButton({ title, content, unitCode, link, finalResult, disable }) {

  //Headers for CSV file
  const headers = [
    { label: "Student ID", key: "studentID" },
    { label: "Student Name", key: "studentName" },
    { label: "SPE1 avg", key: "SPE1Avg" },
    { label: "SPE2 avg", key: "SPE2Avg" },
    { label: "Team Code", key: "teamCode" },
  ];

  //CSV file info
  var csvReport = {
    filename: `${unitCode}SPEScore.csv`,
    headers: headers,
    data: finalResult,
  };

  return (
    <div>
      {title.includes`Self & Peer Evaluation 1 form` ||
      title.includes`Self & Peer Evaluation 2 form` ||
      title === "Add/Update form for SPE 1" ||
      title === "Add/Update form for SPE 2" ||
      title === "Upload student details file" ||
      title === "Register/Update student information" ||
      title === "Register/Update lecture information" ||
      title === "Register Units" ||
      title.includes`Set up a new due date` ? (
          <Link to={link} className="block bg-white lg:p-4 md:p-6 border border-gray-100 drop-shadow-xl rounded-xl focus:outline-none focus:ring hover:cursor-pointer hover:border-red-600 hover:ring-1 hover:ring-red-600">
            <span className="inline-block p-3 rounded-lg bg-gray-50">
              {title === "Add/Update form for SPE 1" ||
              title === "Add/Update form for SPE 2" ||
              title === "Upload student details file" || 
              title === "Register/Update student information" ||
              title === "Register/Update lecture information" ||
              title === "Register Units" ? (
                <AiOutlineEdit size={20} />
              ) : title.includes`Set up a new due date` ||
                title.includes`Self & Peer Evaluation 1 form` ||
                title.includes`Self & Peer Evaluation 2 form` ? (
                svgIcons[3].speIcon
              ) : null}
            </span>

            <h6 className="mt-2 font-bold">{title}</h6>

            <p className="hidden sm:mt-1 sm:text-sm sm:text-gray-600 sm:block">
              {content}
            </p>
          </Link>
      ) : finalResult ? (
        
        <CSVLink {...csvReport} className={`${!disable ? "pointer-events-none" : null}`}>
          <div className="block bg-white p-4 border border-gray-100 drop-shadow-xl rounded-xl focus:outline-none focus:ring hover:cursor-pointer hover:border-red-600 hover:ring-1 hover:ring-red-600">
            <span className="inline-block p-3 rounded-lg bg-gray-50">
              {title ===
              "Download output file (only available after all student submitted spe 1)" ? (
                <AiOutlineDownload size={20} />
              ) : null}
            </span>

            <h6 className="mt-2 font-bold">{title}</h6>

            <p className="hidden sm:mt-1 sm:text-sm sm:text-gray-600 sm:block max-w-md mx-auto">
              {content}
            </p>
          </div>
        </CSVLink>
      ) : null}
    </div>
  );
}

export default SectionButton;
