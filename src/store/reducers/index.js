import { combineReducers } from 'redux';
import wordState from './words';

export default combineReducers({
  wordList: wordState,
});
