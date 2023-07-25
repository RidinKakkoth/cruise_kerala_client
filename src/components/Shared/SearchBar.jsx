// import React, { useState } from 'react'

// function SearchBar() {

//   const [searchQuery, setSearchQuery] = useState("");


//   return (
//     <div className=' flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
//       <div>Anywhere</div>
//       <div className="border-l border-gray-300"></div>
//       <div>Any week</div>
//       <div className="border-l border-gray-300"></div>
//       <div>Add guest</div>
//       <button className='bg-[#011742] text-white p-1 rounded-full '>
//       <svg xmlns="http://www.w3.org/2000/svg" fill="#011742" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
// </svg>

//       </button>
//     </div>
//   )
// }

// export default SearchBar


import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Function to handle input change and call the onSearch prop
  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="search-container bg-white  flex justify-between w-[220px] rounded-xl border px-2 h-10">
      <input
        type="text"
        placeholder="Search by name or district..."
        value={searchQuery}
        onChange={handleInputChange}
        className="search-input bg-white "
      />
     <button className='bg-[#ffffff] text-[#011742] font-bold p-1  rounded-full '>
     <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
 <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
 </svg>

      </button>
    </div>
  );
};

export default SearchBar;
