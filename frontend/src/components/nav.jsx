import { NavLink } from "react-router-dom"
import { SignedIn, UserButton } from "@clerk/clerk-react"

const Nav = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-\[backdrop-filter\]\:bg-background\/60 ">
      <div className=' text-2xl bold '>
        <ul className='flex flex-row  justify-around items-center mt-1.5 hover:cursor-pointer text-gray-400'>
        <NavLink to="/" end><li>Home</li></NavLink>
        <NavLink to="/" end><li>Request a new Feature</li></NavLink>
        <NavLink to="/" end><li>How to use </li></NavLink>
        <NavLink to="/" end><li>About</li></NavLink>
        <SignedIn>
          <li className="flex items-center">
            <UserButton />
          </li>
        </SignedIn>
        </ul>
      </div>
    </header>

  )
}

export default Nav