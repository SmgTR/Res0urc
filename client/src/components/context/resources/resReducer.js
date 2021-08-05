import {
  SHOW_LINKS,
  GET_LINK_INFO,
  GET_MY_RES,
  SET_CURRENT,
  SET_POPULAR,
  SET_NEW,
  SET_BOOKMARKS,
  CLEAR_CURRENT,
  SET_SORT,
  GET_ALL_PUBLIC,
  CLEAR_ALL_FILTERS,
  CLEAR_SELECT,
  GET_BOOKMARKS,
  HIDE_BOOKMARKS,
  SHOW_SEARCH,
  HIDE_SEARCH,
  SEARCH_FOR,
  SHOW__ADD_COLLECTION,
  SET_PREVIEW,
  COL_SET,
  INFO_MSG,
  HIDE_MSG,
  SELECTED_OPTIONS,
  UPDATE_ITEM,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case GET_MY_RES:
      return {
        ...state,
        resources: action.payload,
      };
    case SHOW_LINKS:
      return {
        ...state,
        showLinks: action.payload,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case GET_LINK_INFO:
      return {
        ...state,
        metaData: action.payload,
      };
    case GET_ALL_PUBLIC:
      return {
        ...state,
        publicList: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case SET_POPULAR:
      return {
        ...state,
        filter: {
          ...state.filter,
          popular: true,
        },
      };
    case SET_NEW:
      return {
        ...state,
        filter: {
          ...state.filter,
          newFirst: true,
        },
      };
    case SET_BOOKMARKS:
      return {
        ...state,
        filter: {
          ...state.filter,
          bookmarks: true,
        },
      };
    case SET_SORT:
      return {
        ...state,
        filter: {
          ...state.filter,
          sort: action.payload,
        },
      };
    case SET_PREVIEW:
      return {
        ...state,
        preview: action.payload,
      };
    case CLEAR_ALL_FILTERS:
      return {
        ...state,
        filter: {
          popular: false,
          newFirst: false,
          bookmarks: false,
          sort: null,
        },
      };
    case GET_BOOKMARKS:
      return {
        ...state,
        bookmarks: action.payload,
      };
    case HIDE_BOOKMARKS:
      return {
        ...state,
        bookmarks: null,
      };
    case SHOW_SEARCH:
      return {
        ...state,
        search: true,
      };
    case HIDE_SEARCH:
      return {
        ...state,
        search: false,
      };
    case SEARCH_FOR:
      return {
        ...state,
        searchResults: action.payload,
      };
    case SHOW__ADD_COLLECTION:
      return {
        ...state,
        addCollection: action.payload,
      };
    case COL_SET:
      return {
        ...state,
        showCollectionSettings: action.payload,
      };
    case INFO_MSG:
      return {
        ...state,
        infoMsg: { msg: action.payload.status, text: action.payload.text },
      };
    case HIDE_MSG:
      return {
        ...state,
        infoMsg: { err: false, text: '' },
      };
    case SELECTED_OPTIONS:
      return {
        ...state,
        selectedOptions: action.payload,
      };
    case CLEAR_SELECT:
      return {
        ...state,
        selected: [],
      };
    case UPDATE_ITEM:
      return {
        ...state,
        updateLink: action.payload,
      };
  }
};
