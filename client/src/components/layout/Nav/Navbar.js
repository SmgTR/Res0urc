import React, { useContext } from 'react';
import ResContext from '../../context/resources/resContext';
import Logo from './Logo';

import { UserNav } from '../../User/UserNav';

const Navbar = (props) => {
	const resContext = useContext(ResContext);

	const { searchForShow } = resContext;
	return (
		<div className='nav__container'>
			<div className='nav__container--left'>
				<Logo />
				<form onClick={searchForShow}>
					<input
						type='text'
						value=''
						placeholder='Search for resources...'
					/>
					<div>
						<i className='fas fa-search' />
					</div>
				</form>
			</div>
			<div className='nav__container--right'>
				<UserNav />
			</div>
		</div>
	);
};

export default Navbar;
