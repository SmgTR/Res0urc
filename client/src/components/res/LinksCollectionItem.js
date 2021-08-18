import React from 'react';
import CollectionItem from '../layout/Home/CollectionItem';

const LinksCollectionItem = (collection) => {
  return (
    <CollectionItem
      data={collection.collection}
      key={collection.collection.id}
    />
  );
};

export default LinksCollectionItem;
