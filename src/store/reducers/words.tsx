import { UPDATE_WORDS, UPDATE_SEARCH_TERM } from '../actions';

const initialState = {
  words: [],
  searchTerm: '',
};

const wordState = (
  state = initialState,
  action: { type: any; words: Array<string>; searchTerm: string }
) => {
  switch (action.type) {
    case UPDATE_WORDS:
      return {
        ...state,
        words: action.words,
      };
    case UPDATE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm,
      };
    default:
      return state;
  }
};

export default wordState;
