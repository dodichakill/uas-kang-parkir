import React from "react";

function ItemFeature({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center">
      <div className="p-5 w-16 h-16 from-blue-400 to-purple-500 bg-gradient-to-br text-white rounded-full mt-5 text-2xl">
        {icon}
      </div>
      <h3 className="text-xl text-slate-500 font-semibold mt-3">{title}</h3>
      <p className="mt-3 text-center text-slate-400">{description}</p>
    </div>
  );
}

export default ItemFeature;
