import React, { useContext, useEffect, Fragment, useState } from 'react';

import ResContext from '../context/resources/resContext';
import UsersContext from '../context/users/usersContext';
import Search from '../layout/Home/Search';
import AddCollectionForm from '../res/AddCollectionForm';

import UserInfo from '../User/UserInfo';
import Links from '../res/Links';
import AllRes from '../res/AllRes';
import AddItemList from '../res/AddItemList';
import SaveList from '../utils/SaveList';
import RoundButton from '../layout/Home/RoundButton';
import UserSettings from '../User/UserSettings';
import CollectionSettings from '../res/CollectionSettings';
import slideOne from '../layout/tutorial/Slide';

import BackArrow from '../utils/BackArrow';

const Home = () => {
  const [isSaved, setIsSaved] = useState(false);
  const resContext = useContext(ResContext);
  const usersContext = useContext(UsersContext);

  const {
    user,
    addToUsersBookmarks,
    removeUsersBookmarks,
    userSettings,
    displaySettings,
  } = usersContext;

  const {
    current,
    clearCurrent,
    addToBookmarkCount,
    removeFromBookmarkCount,
    search,
    showLinks,
    setShowLinks,
    addCollection,
    preview,
    setPreview,
    showAddRes,
    addResources,
    addSelect,
    removeSelect,
    openSelected,
    selected,
    openAll,
    collectionSettings,
    showCollectionSettings,
    clearAllFilters,
    setInfoMsg,
    infoMsg,
  } = resContext;

  if (search) return <Search resources={resContext} />;

  if (userSettings) return <UserSettings user={user.data.data} />;

  if (addCollection)
    return (
      <AddCollectionForm
        preview={preview}
        setPreview={setPreview}
        add={addResources}
        setInfoMsg={setInfoMsg}
        infoMsg={infoMsg}
      />
    );

  if (!current) return <AllRes user={user} state={setIsSaved} />;

  if (showCollectionSettings) return <CollectionSettings />;

  const { name, author, links, id } = current[0];
  const userId = user.data.data._id;

  const addListItemForm = () => {
    setShowLinks(!showLinks);
  };

  const backToHome = () => {
    collectionSettings(false);
    setIsSaved(false);
    clearCurrent();
  };

  const addBookmark = () => {
    setIsSaved(true);
    addToBookmarkCount(id, userId);
    addToUsersBookmarks(id);
  };

  const removeBookmark = () => {
    setIsSaved(false);

    removeFromBookmarkCount(id, userId);
    removeUsersBookmarks(id);
  };

  const ifAuthor = userId === author._id;

  let empty = '';

  if (current[0].links.length === 0 && ifAuthor) {
    empty = (
      <h2 className='empty__collection'>
        Nothing here yet, please add first item.
      </h2>
    );
  } else if (current[0].links.length === 0 && !ifAuthor) {
    empty = <h2 className='empty__collection'>This list has no links yet.</h2>;
  }

  return (
    <div className='home'>
      <BackArrow click={backToHome}>
        <h1>Home</h1>
      </BackArrow>
      <div className='home__top'>
        <h1>{name}</h1>
        {ifAuthor ? (
          <h2 onClick={addListItemForm}>
            Add Item <i className='fas fa-plus' />
          </h2>
        ) : null}
        <h2 className={current[0].public ? 'show' : 'hide'}>
          Share <i className='fas fa-share ' />
        </h2>

        <RoundButton text='New session' openSelected={openAll} />
        <RoundButton
          text='New session from selected'
          openSelected={openSelected}
        />

        {ifAuthor ? (
          <i className='fas fa-cog settings' onClick={collectionSettings} />
        ) : (
          <SaveList
            text={isSaved ? 'Bookmark Saved' : 'Add Bookmark'}
            icon={isSaved ? 'fas fa-bookmark active' : 'far fa-bookmark'}
            add={isSaved ? removeBookmark : addBookmark}
          />
        )}
      </div>
      <div className='author'>
        <UserInfo photo={author.photo} name={author.name} />
      </div>
      <div className='info'>
        <p>{links.length}/20 Links</p>
        <p>{current[0].public ? 'Public' : 'Private'}</p>
      </div>

      {empty}
      {showLinks ? (
        <div className={'links-grid'}>
          <Links
            links={links}
            addSelect={addSelect}
            removeSelect={removeSelect}
          />
        </div>
      ) : (
        <div className='add__item inputs__default'>
          <BackArrow click={setShowLinks}>
            <h1>Collection</h1>
          </BackArrow>
          <AddItemList show={showLinks} back={addListItemForm} />
        </div>
      )}
    </div>
  );
};

export default Home;
