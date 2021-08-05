import React, { useReducer } from 'react';
import ResContext from './resContext';
import resReducer from './resReducer';
import defaultCover from '../../../assets/defaultCover.png';

import {
  SHOW_LINKS,
  GET_MY_RES,
  SET_CURRENT,
  GET_LINK_INFO,
  GET_ALL_PUBLIC,
  CLEAR_CURRENT,
  CLEAR_SELECT,
  SET_POPULAR,
  SET_NEW,
  SET_BOOKMARKS,
  GET_BOOKMARKS,
  HIDE_BOOKMARKS,
  SET_SORT,
  CLEAR_ALL_FILTERS,
  SHOW_SEARCH,
  HIDE_SEARCH,
  SEARCH_FOR,
  SHOW__ADD_COLLECTION,
  SET_PREVIEW,
  COL_SET,
  INFO_MSG,
  SELECTED_OPTIONS,
  UPDATE_ITEM,
} from '../../types';
import axios from 'axios';
import { check } from 'prettier';

const ResState = (props) => {
  const initialState = {
    metaData: null,
    resources: null,
    current: null,
    publicList: null,
    searchResults: null,
    bookmarks: null,
    search: false,
    addCollection: false,
    showLinks: true,
    preview: defaultCover,
    selected: [],
    updateLink: false,
    selectedOptions: false,
    showCollectionSettings: false,
    infoMsg: { msg: false, text: '' },
    filter: {
      popular: false,
      newFirst: true,
      bookmarks: false,
      sort: null,
    },
  };
  const [state, dispatch] = useReducer(resReducer, initialState);

  const setShowLinks = (value) => {
    dispatch({ type: SHOW_LINKS, payload: value });
  };

  const getResources = async () => {
    try {
      const res = await axios.get('/api/v1/resources/my');

      dispatch({ type: GET_MY_RES, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  const getOnePublic = async (id) => {
    try {
      const res = await axios.get(`/api/v1/resources/${id}`);

      const output = [res.data.data.data];

      dispatch({ type: SET_CURRENT, payload: output });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const addListItem = async (links, updated) => {
    try {
      let data = state.current[0].links;

      if (updated) {
        data = updated;
      }

      data.push(links);

      await axios.patch(`/api/v1/resources/${state.current[0]._id}`, {
        links: data,
      });

      getOnePublic(state.current[0]._id);

      setPreview(defaultCover);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const setUpdateListItem = (show) => {
    dispatch({ type: UPDATE_ITEM, payload: show });
  };

  const updateCollection = async (data) => {
    try {
      const res = await axios.patch(
        `/api/v1/resources/${state.current[0]._id}`,

        data
      );
      getResources();
      getAllRes();

      if (!state.infoMsg.msg) collectionSettings(false);
      const element = [res.data.data.data];
      setCurrent(element);
    } catch (err) {}
  };

  const deleteCollection = async (id) => {
    try {
      const res = await axios.delete(
        `/api/v1/resources/${state.current[0]._id}`
      );

      getResources();
      getAllRes();
      setCurrent(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addToBookmarkCount = async (id, userId) => {
    try {
      const res = await axios.get(`/api/v1/resources/${id}`);

      const data = res.data.data.data.addedToBookmark;

      if (data.includes(userId)) return null;

      data.push(userId);
      await axios.patch(`/api/v1/resources/${state.current[0]._id}`, {
        addedToBookmark: data,
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const removeFromBookmarkCount = async (id, userId) => {
    const res = await axios.get(`/api/v1/resources/${id}`);

    const data = res.data.data.data.addedToBookmark;
    for (let i = 0; i < data.length; i++) {
      if (data[i] === userId) {
        data.splice(i, 1);
      }
    }

    await axios.patch(`/api/v1/resources/${state.current[0]._id}`, {
      addedToBookmark: data,
    });
  };

  const getAllRes = async (page, popular, limit) => {
    try {
      const sort = state.filter.sort;

      const res = await axios.get(
        `/api/v1/resources?public=true&page=${page || 1}&${limit || 'limit=9'}${
          sort !== null ? sort : ''
        }`
      );

      dispatch({ type: GET_ALL_PUBLIC, payload: res });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const addResources = async (data) => {
    try {
      const post = await axios.post(`/api/v1/resources`, data);

      const res = await axios.get(
        `/api/v1/resources/${post.data.data.data.id}`
      );

      if (res) {
        setCurrent([res.data.data.data]);
      }
      getResources();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const fetchLinkInfo = async (url) => {
    try {
      const res = await axios.get(`/api/v1/tags/${url}`);

      dispatch({ type: GET_LINK_INFO, payload: res.data.data });
    } catch (err) {
      console.log(err);
    }
  };

  const setCurrent = (res) => {
    collectionSettings(false);
    clearAllFilters();
    hideBookmarks();
    clearSelected();
    setUpdateListItem(false);
    hideSearchFor();
    dispatch({ type: SET_CURRENT, payload: res });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const getUserBookmarks = async (userList) => {
    try {
      let res = [];

      userList.map(async (list) => {
        const data = await axios.get(`api/v1/resources/${list.listId}`);
        res.push(data.data.data.data);
      });

      dispatch({ type: GET_BOOKMARKS, payload: res });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const hideBookmarks = () => {
    dispatch({ type: HIDE_BOOKMARKS });
  };

  const showFilter = (filter, sort) => {
    clearCurrent();
    clearAllFilters();
    setUpdateListItem(false);
    // hideBookmarks();
    if (filter === 'popular') {
      hideBookmarks();
      setSort(sort);
      return dispatch({ type: SET_POPULAR });
    }
    if (filter === 'newFirst') {
      hideBookmarks();
      setSort(sort);
      return dispatch({ type: SET_NEW });
    }
    if (filter === 'bookmarks') {
      return dispatch({ type: SET_BOOKMARKS });
    }
  };
  const setSort = (sort) => {
    dispatch({ type: SET_SORT, payload: sort });
  };

  const clearAllFilters = () => {
    dispatch({ type: CLEAR_ALL_FILTERS });
  };

  const searchForShow = () => {
    dispatch({ type: SHOW_SEARCH });
  };

  const searchFor = async (key) => {
    try {
      const res = await axios.get(`/api/v1/resources/search/${key}`);
      dispatch({ type: SEARCH_FOR, payload: res });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const hideSearchFor = () => {
    dispatch({ type: HIDE_SEARCH });
  };

  const showAddCollection = (val) => {
    dispatch({ type: SHOW__ADD_COLLECTION, payload: val });
  };

  const setPreview = (val) => {
    dispatch({ type: SET_PREVIEW, payload: val });
  };

  const addSelect = (item) => {
    state.selected.push({ id: item.id, url: item.url });
    console.log(state.selected);
    showSelectedOptions();
  };

  const removeSelect = (item) => {
    let arr = [...state.selected];
    arr = state.selected.filter((el) => {
      return el.id !== item;
    });

    state.selected = [...arr];
    showSelectedOptions();
  };

  const clearSelected = () => {
    if (state.selected.length > 0) {
      state.selected = [];
      console.log(state.selected);
    }
    dispatch({ type: CLEAR_SELECT });
  };

  const showSelectedOptions = () => {
    if (state.selected.length == 1) {
      dispatch({ type: SELECTED_OPTIONS, payload: true });
    } else {
      dispatch({ type: SELECTED_OPTIONS, payload: false });
    }
  };

  const openSelected = () => {
    const myLinks = state.selected;
    for (var i = 0; i < myLinks.length; i++) {
      window.open(myLinks[i].url);
    }
  };

  const openAll = () => {
    const myLinks = state.current[0].links;

    for (var i = 0; i < myLinks.length; i++) {
      window.open(myLinks[i].url);
    }
  };

  const collectionSettings = (show) => {
    dispatch({ type: COL_SET, payload: show });
  };

  const setInfoMsg = (status, text) => {
    const data = {
      status,
      text,
    };
    dispatch({ type: INFO_MSG, payload: data });
    console.log(state.infoMsg);
  };

  return (
    <ResContext.Provider
      value={{
        metaData: state.metaData,
        resources: state.resources,
        current: state.current,
        publicList: state.publicList,
        filter: state.filter,
        bookmarks: state.bookmarks,
        search: state.search,
        searchResults: state.searchResults,
        showLinks: state.showLinks,
        addCollection: state.addCollection,
        infoMsg: state.infoMsg,
        preview: state.preview,
        selected: state.selected,
        selectedOptions: state.selectedOptions,
        showCollectionSettings: state.showCollectionSettings,
        updateLink: state.updateLink,
        setShowLinks,
        getResources,
        setCurrent,
        fetchLinkInfo,
        addListItem,
        getAllRes,
        getOnePublic,
        clearCurrent,
        addToBookmarkCount,
        removeFromBookmarkCount,
        showFilter,
        setSort,
        getUserBookmarks,
        searchFor,
        searchForShow,
        hideSearchFor,
        showAddCollection,
        setPreview,
        addResources,
        addSelect,
        removeSelect,
        openSelected,
        openAll,
        collectionSettings,
        updateCollection,
        deleteCollection,
        setInfoMsg,
        showSelectedOptions,
        clearSelected,
        setUpdateListItem,
      }}
    >
      {props.children}
    </ResContext.Provider>
  );
};

export default ResState;
