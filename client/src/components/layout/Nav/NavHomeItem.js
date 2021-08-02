import React, { Fragment } from 'react';

const NavHome = ({
  name,
  active,
  click,
  text,
  icon,
  setSort,
  bookmarks,
  user,
}) => {
  const filter = () => {
    if (name === 'popular') {
      return click('popular', `&sort=-addedToBookmark`);
    }
    if (name === 'newFirst') {
      return click('newFirst', `&sort=-createdAt`);
    }
    if (name === 'bookmarks') {
      bookmarks(user);
      return click('bookmarks');
    }
  };

  const data = (
    <p onClick={filter} className={active ? 'active' : ''}>
      {text}
      <i className={icon}></i>
    </p>
  );

  return <Fragment>{data}</Fragment>;
};

export default NavHome;
