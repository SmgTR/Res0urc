import React, { Fragment } from 'react';
import LinksCollectionItem from './LinksCollectionItem';

const LinksCollections = ({ collections, get }) => {
  if (collections.length > 0) {
    return (
      <Fragment>
        {collections.map(collection => {
          return (
            <div onClick={() => get(collection._id)}>
              <LinksCollectionItem collection={collection} />
            </div>
          );
        })}
      </Fragment>
    );
  } else {
    return <h1>Nothing here.</h1>;
  }
};

export default LinksCollections;
