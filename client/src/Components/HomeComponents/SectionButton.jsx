import React from "react";
import { Link } from "react-router-dom";

function SectionButton({title, content, link}) {
  return (
    <div>
      <Link
        className="block bg-white p-4 border border-gray-100 shadow-sm rounded-xl focus:outline-none focus:ring hover:border-red-600 hover:ring-1 hover:ring-red-600"
        to={link}
      >
        <span className="inline-block p-3 rounded-lg bg-gray-50">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            ></path>
          </svg>
        </span>

        <h6 className="mt-2 font-bold">{title}</h6>

        <p className="hidden sm:mt-1 sm:text-sm sm:text-gray-600 sm:block">
          {content}
        </p>
      </Link>
    </div>
  );
}

export default SectionButton;
