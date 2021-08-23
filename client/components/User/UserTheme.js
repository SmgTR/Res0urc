import React, { useState } from 'react';

const UserTheme = ({ theme, update }) => {
	console.log(theme);

	const blueTheme = 'color__circle blue';
	const greenTheme = 'color__circle light__green';
	const redTheme = 'color__circle red';

	const clearAllSelections = (e) => {
		const parent = e.target.parentNode.children;

		const arr = [ ...parent ];

		arr.map((el) => {
			const findSelected = el.classList;

			if (findSelected.contains('selected')) {
				el.classList.remove('selected');
			}
		});

		click(e);
	};

	const click = (e) => {
		update(e.target.id);
		if (!e.target.classList.contains('flex')) {
			e.target.classList.add('selected');
		}
	};

	return (
		<div className='flex' onClick={clearAllSelections}>
			<div
				className={
					theme === '0078a8' ? `${blueTheme} selected` : blueTheme
				}
				id='0078a8'
			/>
			<div
				className={
					theme === '178200' ? `${greenTheme} selected` : greenTheme
				}
				id='178200'
				onClick={click}
			/>
			<div
				className={
					theme === 'FF0c9C' ? `${redTheme} selected` : redTheme
				}
				id='FF9c9C'
				onClick={click}
			/>
		</div>
	);
};

export default UserTheme;
