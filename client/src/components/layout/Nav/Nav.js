import React, { useContext, useEffect } from 'react';
import ResContext from '../../context/resources/resContext';
import UsersContext from '../../context/users/usersContext';
import NavItem from './NavItem';
import NavHome from './NavHomeItem';
import AddCollection from '../../res/AddCollection';

const Nav = () => {
  const resContext = useContext(ResContext);
  const usersContext = useContext(UsersContext);

  const { user, displaySettings } = usersContext;

  const {
    getResources,
    resources,
    current,
    setCurrent,
    showFilter,
    filter,
    getAllRes,
    setSort,
    sort,
    getUserBookmarks,
    setShowLinks,
    showAddCollection,
    collectionSettings,
  } = resContext;

  const { popular, newFirst, bookmarks } = filter;

  useEffect(() => {
    getResources();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    //manage menu on smaller devices

    document.addEventListener('click', (e) => {
      const list = e.target;

      const nav = document.querySelector('.nav');
      const close = document.querySelector('.small__close');

      if (nav) {
        if (
          list.classList.contains('small__close') ||
          list.classList.contains('active') ||
          list.classList.contains('active__icon')
        ) {
          nav.classList.remove('small__show');
          close.style.display = 'none';
        }

        if (
          list.classList.contains('small__menu') ||
          list.classList.contains('small__menu-item') ||
          list.classList.contains('mobile__menu')
        ) {
          nav.classList.add('small__show');
          close.style.display = 'block';
        }
      }
    });

    getAllRes();
    displaySettings(false);
    showAddCollection(false);
    collectionSettings(false);
  }, [filter]);

  if (resources === null) return null;

  const list = resources.data.data;

  const userBookmarks = user.data.data.savedLists || null;

  const onClick = (e) => {
    getResources();
    const element = list.filter((el) => {
      return el.id === e.target.getAttribute('data-id');
    });
    console.log(element);
    setShowLinks(true);
    setCurrent(element);
  };

  return (
    <nav className='nav'>
      <h1>Home</h1>
      <h1 className='small__close'>x</h1>
      <NavHome
        name={'popular'}
        click={showFilter}
        active={popular && !current}
        text={'Popular'}
        icon={'fas fa-fire'}
        setSort={setSort}
      />
      <NavHome
        name={'newFirst'}
        click={showFilter}
        active={newFirst && !current}
        text={'New'}
        icon={'fas fa-leaf'}
      />
      <NavHome
        name={'bookmarks'}
        click={showFilter}
        user={userBookmarks}
        bookmarks={getUserBookmarks}
        active={bookmarks && !current}
        text={'Bookmarks'}
        icon={'fas fa-bookmark'}
      />

      <h1>
        Resources{' '}
        <AddCollection show={showAddCollection} hide={displaySettings} />
      </h1>
      <h2>{list.length === 0 ? "You don't have any list yet." : ''}</h2>
      <ul>
        {list.map((item) => {
          return (
            <NavItem
              key={item._id}
              name={item.name}
              id={item._id}
              onClick={onClick}
              class={
                current !== null && current[0].id === item._id ? 'active' : ''
              }
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
