import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { svgIcons } from "../../js/svgIcons";
import { AiOutlineDownload } from "react-icons/ai";
import { CSVLink } from "react-csv";

function SectionButton({ title, content, unitCode, link, finalResult }) {

  //Headers for CSV file
  const headers = [
    { label: "Student ID", key: "studentID" },
    { label: "Student Name", key: "studentName" },
    { label: "Student average score", key: "studentAvg" },
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
      title.includes`Set up a new due date` ? (
        <div className="block bg-white p-4 border border-gray-100 drop-shadow-xl rounded-xl focus:outline-none focus:ring hover:cursor-pointer hover:border-red-600 hover:ring-1 hover:ring-red-600">
          <Link to={link}>
            <span className="inline-block p-3 rounded-lg bg-gray-50">
              {title === "Add/Update form for SPE 1" ||
              title === "Add/Update form for SPE 2" ||
              title === "Upload student details file" ? (
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
        </div>
      ) : finalResult ? (
        <CSVLink {...csvReport}>
          <div className="block bg-white p-4 border border-gray-100 drop-shadow-xl rounded-xl focus:outline-none focus:ring hover:cursor-pointer hover:border-red-600 hover:ring-1 hover:ring-red-600">
            <span className="inline-block p-3 rounded-lg bg-gray-50">
              {title ===
              "Download output file (only available after due date)" ? (
                <AiOutlineDownload size={20} />
              ) : null}
            </span>

            <h6 className="mt-2 font-bold">{title}</h6>

            <p className="hidden sm:mt-1 sm:text-sm sm:text-gray-600 sm:block">
              {content}
            </p>
          </div>
        </CSVLink>
      ) : null}
    </div>
  );
}

export default SectionButton;
