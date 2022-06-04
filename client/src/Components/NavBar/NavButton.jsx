import React from "react";
import { Link } from "react-router-dom";

function NavButton({ link, icon, text, dropdownIcon }) {
  return (
    <Link
      to={link}
      className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-700"
    >
      {icon} {text}
    </Link>
  );
}

export default NavButton;
