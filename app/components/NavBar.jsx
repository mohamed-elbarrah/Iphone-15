import React from 'react'
import { appleImg, bagImg, searchImg } from '../utils'
import { navLists } from '../constants'


export default function NavBar() {
  return (
    <header className='w-full py-5 sm:px10 px-5 flex items-center justify-between'>
      <nav className="flex items-center justify-between w-full">
          <img src={appleImg} alt="Apple" width={18} height={18} />   
          <div className='flex items-center justify-between gap-5 sm:gap-10'>
            {navLists.map((nav) => (
              <div key={nav} className="cursor-pointer hover:text-zinc-300 transition-all duration-300">
                {nav}
              </div>
            ))}
          </div>    
          <div className='flex items-center justify-between gap-5 sm:gap-10'>
            {/* <img src={searchImg} alt="search" width={18} height={18}/> */}
            <img src={bagImg} alt="bag" width={18} height={18}/>
          </div>
      </nav>
    </header>
  )
}
