import React from 'react'
import "./searchBar.css"
import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  return (
    <form class="" role="search">
        <div className='col bg-white rounded my-3 d-flex flex-row align-items-center justify-content-between'>
            <div className='searchBar col-xl-4 d-flex justify-content-center m-3'>
                <div className='col-xl-12 d-flex searchBarItem m-auto'>
                <input class="searchInput form-control" 
                type="search" placeholder="Search" 
                aria-label="Search"
                value={inputValue}
                onChange={handleInputChange}
                />
                <button class="searchButton btn btn-outline-success bg-primary" 
                type="submit"
                onClick={handleSearchClick}>
                  Search
                  </button>
                </div>
            </div>
            <div className='m-3'>
                <button className='btn btn-outline-success bg-primary Addbutton p-0 ' type='button'>Add</button>
            </div>
        </div>
    </form>
  )
}

export default SearchBar