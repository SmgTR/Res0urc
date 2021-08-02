import React, { Fragment } from 'react';
import SearchCollectionItem from './SearchCollectionItem';

const SearchCollections = ({ lists, set }) => {
  return lists.map(list => {
    return (
      <div className="search__collection">
        {<SearchCollectionItem list={list} key={list._id} set={set} />}
      </div>
    );
  });
};

export default SearchCollections;
