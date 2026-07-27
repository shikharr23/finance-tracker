import React from 'react'

const Button = ({ text }) => {
  return (
    <button
      type="submit"
      className="w-full bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-200 shadow-sm text-sm cursor-pointer active:scale-[0.99]"
    >
      {text}
    </button>
  )
}

export default Button
