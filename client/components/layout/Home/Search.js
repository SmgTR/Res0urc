import React, { useState, useEffect } from 'react';
import LinksCollections from '../../res/LinksCollections';
import SearchCollections from './SearchCollections';

const Search = ({ resources }) => {
  const {
    hideSearchFor,
    publicList,
    searchFor,
    searchResults,
    setCurrent,
  } = resources;
  const [searchRes, setSearchRes] = useState();

  const searchHandler = async (e) => {
    if (e.target.value !== '') {
      await searchFor(e.target.value);

      if (searchResults) {
        const res = searchResults.data.results;

        setSearchRes(res);
      }
    }
    if (e.target.value === '') {
      setSearchRes('');
    }
  };
  return (
    <div className='search'>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='search__top'>
          <p>Search for resources</p>
          <p onClick={hideSearchFor}>x</p>
        </div>
        <input
          type='text'
          name='searchInpt'
          placeholder='Search'
          onChange={searchHandler}
          autoFocus
        />
      </form>
      <div className='search__results links-grid'>
        {searchRes ? (
          <SearchCollections lists={searchRes} set={setCurrent} />
        ) : null}
      </div>
    </div>
  );
};

export default Search;
