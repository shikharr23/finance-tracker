import React from "react";

const Input = ({ label, type = "text", placeholder, onChange, value, spellCheck }) => {
  return (
    <div className="text-xl font-semibold">
      {label && <label className="block mb-1">{label} </label>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        spellCheck={spellCheck}
        className="border rounded px-3 py-2 w-full font-semibold"
      />
    </div>
  );
};

export default Input;
