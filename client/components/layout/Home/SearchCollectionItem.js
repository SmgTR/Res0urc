import React from 'react';
import CollectionItem from './CollectionItem';

const SearchCollectionItem = ({ list, set }) => {
  return (
    <div onClick={() => set([list])}>
      <CollectionItem data={list} />
    </div>
  );
};

export default SearchCollectionItem;
