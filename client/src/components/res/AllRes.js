import React, { useContext, useEffect, Fragment } from 'react';
import ResContext from '../context/resources/resContext';
import LinksCollections from './LinksCollections';
import DisplayPages from '../utils/DisplayPages';
import checkImage from '../utils/checkImage';

const AllRes = ({ user, state }) => {
	const resContext = useContext(ResContext);

	useEffect(() => {
		getAllRes();
	}, []);

	const {
		getAllRes,
		publicList,
		getOnePublic,
		current,
		bookmarks,
		replaceNotExImage
	} = resContext;
	const checkBookmark = (id) => {
		const savedLists = user.data.data.savedLists;

		savedLists.filter((el) => {
			if (el.listId === id) state(true);
		});
	};

	const getOne = (id) => {
		checkBookmark(id);
		getOnePublic(id);
	};

	if (!publicList) return null;

	const collections = bookmarks ? bookmarks : publicList.data.data.data;

	const pages = bookmarks ? null : publicList.data.pages;

	return (
		<div className='collections'>
			<div className='links-grid'>
				<LinksCollections collections={collections} get={getOne} />
			</div>

			<DisplayPages pages={pages} getPage={getAllRes} />
		</div>
	);
};

export default AllRes;
