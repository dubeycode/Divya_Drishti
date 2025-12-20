import React from 'react'

const Nav = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-\[backdrop-filter\]\:bg-background\/60 ">
      <div className=' text-2xl bold '>
        <ul className='flex flex-row  justify-around mt-1.5 hover:cursor-pointer text-gray-400'>
          <li>Home</li> 
          <li>Request a new Feature</li>  
          <li>How to use </li>
          <li>About</li>
        </ul>
      </div>
    </header>

  )
}

export default Nav