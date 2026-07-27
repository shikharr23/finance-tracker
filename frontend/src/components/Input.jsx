import React from "react";

const Input = ({ label, type = "text", placeholder, onChange, value, spellCheck }) => {
  return (
    <div className="w-full">
      {label && <label className="block mb-1 text-sm font-semibold text-slate-600">{label}</label>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        spellCheck={spellCheck}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-100 outline-none text-slate-800 font-medium placeholder:text-slate-400 text-sm transition"
      />
    </div>
  );
};

export default Input;
