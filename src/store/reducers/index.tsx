import { combineReducers } from 'redux';
import wordState from './words';

export default combineReducers({
  words: wordState,
});
