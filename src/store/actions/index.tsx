export const UPDATE_WORDS = 'UPDATE_WORDS';
export const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM';

export const updateWords = (words: Array<string>) => ({
  type: UPDATE_WORDS,
  words,
});

export const updateSearchTerm = (searchTerm: string) => ({
  type: UPDATE_SEARCH_TERM,
  searchTerm,
});
