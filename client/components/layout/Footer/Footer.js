import React from 'react';
import FooterList from './FooterList';

const Footer = () => {
	return (
		<footer className='footer'>
			<FooterList>
				<li>Privacy Policy</li>
				<li>Terms of use</li>
				<li>FAQ</li>
				
			</FooterList>
			<FooterList>
				<li>Facebook</li>
				<li>Twitter</li>
				<li>Instagram</li>
			</FooterList>
		</footer>
	);
};

export default Footer;
