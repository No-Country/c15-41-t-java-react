import React from 'react'
import { GoSearch } from 'react-icons/go'

const SearchBookModify: React.FC = () => {
  return (
    
    <div className='grid grid-cols-8 h-full w-full justify-center mt-10 items-center mx-auto '>
    <div className="  flex h-full w-full col-span-7  items-center gap-x-4 rounded-3xl bg-white pl-4 text-lg font-bold shadow-lg">
      <label htmlFor="searchInput">
        <GoSearch className=" text-2xl" />
      </label>
      <input
        id="searchInput"
        className="folnt-bold h-full w-full border-0 font-poppins text-lg placeholder-black focus:outline-none"
        type="text"
        placeholder="Buscar"
      />
    
    </div>
    <button 
      className="h-8 w-8 rounded-full bg-white text-black font-bold text-lg ml-2">
       ?
      </button>
    </div>
   
  )
}

export default SearchBookModify
