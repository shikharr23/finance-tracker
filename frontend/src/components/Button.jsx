import React from 'react'

const Button = ( {text} ) => {
  return (
    <div>
        <button type='submit' className='border border-black rounded-md text-lg px-5 py-1 text-center font-semibold cursor-pointer mx-auto hover:bg-slate-400 hover:text-white' > {text} </button>
    </div>
  )
}

export default Button
