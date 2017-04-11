import { combineReducers } from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import auth from './auth';
import { reducer as form } from 'redux-form';
import user from './user';
import currentSurvey from './survey';
import surveyList from './search';

const rootReducer = combineReducers({
	routing,
	auth,
	form,
	user,
	currentSurvey,
	surveyList
});

export default rootReducer;
