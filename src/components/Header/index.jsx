import React from "react";
import modeicon from "../../assets/icons/modeicon.png";
import bellicon from "../../assets/icons/bellicon.png";
import avataricon from "../../assets/icons/avataricon.png";
import { HashLink } from "react-router-hash-link";
const Header = () => {
 const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    console.log("Welcome", user);
  }
  return (
    <div className="flex justify-end gap-8 h-20 pr-10 items-center w-full bg-white shadow-custom-shadow">
      <img
        className="cursor-pointer"
        src={modeicon}
        alt="mode"
        width={18}
        height={18}
      />
      <img
        className="cursor-pointer"
        src={bellicon}
        alt="bell"
        width={18}
        height={18}
      />
      <HashLink
        onClick={() => {
          localStorage.removeItem("user");
        }}
        to="/"
        className={`w-auto px-8 py-2 flex justify-center items-center bg-sky-700 text-xl text-white rounded-[50px] ${
          user ? "block" : "hidden"
        }`}
      >
        Logout
      </HashLink>
      <HashLink
        to="/Auth"
        className={`w-auto px-8 py-2 flex justify-center items-center bg-sky-700 text-xl text-white rounded-[50px] ${
          user ? "hidden" : "block"
        }`}
      >
        Login
      </HashLink>
    </div>
  );
};

export default Header;
