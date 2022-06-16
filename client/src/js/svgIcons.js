const svgIcons = [
  {
    homeIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-home w-5 h-5 opacity-75"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <polyline points="5 12 3 12 12 3 21 12 19 12"></polyline>
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
      </svg>
    ),

    homeText: <span className="ml-3 text-sm font-medium"> Home </span>,
  },
  {
    groupCatIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-school w-5 h-5 opacity-75"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6"></path>
        <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4"></path>
      </svg>
    ),

    groupCatText: <span className="ml-3 text-sm font-medium"> ICT302 </span>,

    groupCatDropDownIcon: (
      <span className="ml-auto transition duration-300 shrink-0 group-open:-rotate-180">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    ),
  },
  {
    groupIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 opacity-75"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),

    groupText1: <span className="ml-3 text-sm font-medium"> Group 1 </span>,
    groupText2: <span className="ml-3 text-sm font-medium"> Group 2 </span>,
  },
  {
    speIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-notes w-5 h-5 opacity-75"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <rect x="5" y="3" width="14" height="18" rx="2"></rect>
        <line x1="9" y1="7" x2="15" y2="7"></line>
        <line x1="9" y1="11" x2="15" y2="11"></line>
        <line x1="9" y1="15" x2="13" y2="15"></line>
      </svg>
    ),

    speText1: (
      <span className="ml-3 text-sm font-medium"> Self & Peer Evaluation 1 </span>
    ),
    speText2: (
      <span className="ml-3 text-sm font-medium"> Self & Peer Evaluation 2 </span>
    ),
  },
  {
    accountIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 opacity-75"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),

    accountText: <span className="ml-3 text-sm font-medium"> Account </span>,

    accountDropDownIcon: (
      <span className="ml-auto transition duration-300 shrink-0 group-open:-rotate-180">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    ),
  },
  {
    detailsIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 opacity-75"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
        />
      </svg>
    ),

    detailsText: <span className="ml-3 text-sm font-medium"> Details </span>,
  },
  {
    logoutIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 opacity-75"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    ),

    logoutText: <span className="ml-3 text-sm font-medium"> Logout </span>,
  },
  {
    formIcon:(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-notes w-5 h-5 opacity-75"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <rect x="5" y="3" width="14" height="18" rx="2"></rect>
        <line x1="9" y1="7" x2="15" y2="7"></line>
        <line x1="9" y1="11" x2="15" y2="11"></line>
        <line x1="9" y1="15" x2="13" y2="15"></line>
      </svg>
    ),
    formText: <span className="ml-3 text-sm font-medium">Add/Update Forms</span> 
  }
];

export { svgIcons };
