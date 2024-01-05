import React from "react";

function BtnMenuNavbar({ icon, text, url, isActive, isLogout, onClick }) {
  return (
    <button
      to={url}
      className={`px-5 py-3 rounded-lg text-white gap-3 border-white border-2 w-60 flex hover:bg-slate-100/50 hover:font-semibold ${
        isActive && "bg-white text-black font-bold hover:bg-white"
      } ${isLogout && "bg-red-600 hover:bg-red-700"} `}
      onClick={onClick}
    >
      <span className="text-2xl">{icon}</span>
      {text}
    </button>
  );
}

export default BtnMenuNavbar;
