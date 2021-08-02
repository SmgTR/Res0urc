import React from 'react';

const NavDropdown = ({ open, logout }) => {
	return (
		<div className='dropdown'>
			<div className='flex' onClick={() => open(true)}>
				<i className='fas fa-cog' />
				<p>Settings</p>
			</div>
			<div className='flex'>
				<i className='fas fa-sign-out-alt' />
				<p onClick={logout}>Logout</p>
			</div>
		</div>
	);
};

export default NavDropdown;
