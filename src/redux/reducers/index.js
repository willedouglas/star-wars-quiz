import { combineReducers } from 'redux';

import game from './game';
import toasts from './toasts';

export default combineReducers({
	game,
	toasts
});