import React from 'react';

const NavItem = props => {
  return (
    <li data-id={props.id} onClick={props.onClick} className={props.class}>
      {props.name}
    </li>
  );
};

export default NavItem;
