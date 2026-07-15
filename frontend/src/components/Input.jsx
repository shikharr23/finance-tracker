import React from "react";

const Input = ({ label, type = "text", placeholder, onChange, value, spellCheck }) => {
  return (
    <div className="text-lg font-semibold text-slate-900">
      {label && <label className="block mb-1">{label} </label>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        spellCheck={spellCheck}
        className="border rounded px-2 mt-1 mb-2 py-1 w-full font-semibold text-slate-700"
      />
    </div>
  );
};

export default Input;
