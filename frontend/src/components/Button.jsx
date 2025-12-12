import React from 'react'

const Button = ( {text} ) => {
  return (
    <div>
        <button className='border border-black rounded-xl text-2xl px-5 py-1 text-center font-semibold cursor-pointer mx-auto' > {text} </button>
    </div>
  )
}

export default Button
