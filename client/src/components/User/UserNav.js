import React, { Fragment, useContext, useEffect, useState } from 'react';
import UsersContext from '../context/users/usersContext';
import UserAvatar from './UserAvatar';
import NavDropdown from '../layout/Nav/NavDropdown';

export const UserNav = () => {
	const usersContext = useContext(UsersContext);
	const [ dropdownShow, setDropdownShow ] = useState(false);

	const { getUser, user, displaySettings, logout } = usersContext;

	useEffect(() => {
		getUser();

		function show(e) {
			if (e.target.classList.contains('triggerDropdown')) {
				setDropdownShow(!dropdownShow);
			} else {
				setDropdownShow(false);
			}
		}

		document.addEventListener('click', show);
		// eslint-disable-next-line
	}, []);

	if (user === null) return null;

	const { photo, name } = user.data.data;

	return (
		<Fragment>
			<UserAvatar photo={photo} />
			<div className='drop'>
				<div className='dropdownBox flex'>
					<p className='triggerDropdown'>{name}</p>
					<i className='fas fa-chevron-down triggerDropdown' />
				</div>
				{dropdownShow === true ? (
					<NavDropdown open={displaySettings} logout={logout} />
				) : null}
			</div>
		</Fragment>
	);
};
