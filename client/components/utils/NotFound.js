import React from 'react';
import notfound from '../../assets/notfound.svg';

const NotFound = () => {
	return (
		<div className='notfound'>
			<div className='notfound__content'>
				<h1>Not Found 404</h1>
				<p className='lead'>
					The page you are looking for does not exist, go to{' '}
					<span>Home Page</span>
				</p>
				<img src={notfound} alt='page not found 404 ' />
			</div>
		</div>
	);
};

export default NotFound;
