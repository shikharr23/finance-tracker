import React from 'react'

const Button = ( {text} ) => {
  return (
    <div>
        <button type='submit' className='border border-black rounded-md text-2xl px-5 py-1 text-center font-semibold cursor-pointer mx-auto hover:bg-pink-300 hover:text-white' > {text} </button>
    </div>
  )
}

export default Button
