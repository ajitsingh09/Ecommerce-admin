import Link from "next/link";
import React from "react";

const NavLink = ({ currentPath, name, icon, path = "/" }) => {
  const inActiveLink = "flex flex-row gap-2 p-1";
  const activeLink =
    inActiveLink + " bg-white text-blue-900 rounded-es-md rounded-ss-md";
  return (
    <div>
      <div className="bg-white content-[''] h-1 hidden md:block">
        <div
          className={`w-full bg-blue-600 content-[''] h-full ${
            currentPath === path.slice(1) ? "rounded-ee-md" : "rounded-none"
          }`}
        ></div>
      </div>
      <Link
        href={path}
        className={currentPath === path.slice(1) ? activeLink : inActiveLink}
      >
        {icon}
        {name}
      </Link>
      <div className="bg-white content-[''] h-1 hidden md:block">
        <div
          className={`w-full bg-blue-600 content-[''] h-full ${
            currentPath === path.slice(1) ? "rounded-se-md" : "rounded-none"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default NavLink;
