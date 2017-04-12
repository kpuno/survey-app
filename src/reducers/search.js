import initialState from './initialState';
import axios from 'axios';
const HOST_URL = 'https://survey-app-api.herokuapp.com';
import { requestData, receiveData } from './loading';

// actions
export const GET_SEARCHED_SURVEY = 'GET_SEARCHED_SURVEY';

// reducer
export function searchSurvey(title) {
	return function (dispatch) {
		dispatch(requestData());
		axios.post(`${HOST_URL}/getallsurveys`, { title })
			.then(response => {
				dispatch(receiveData());
				const surveyList = response.data;
				dispatch({ type: GET_SEARCHED_SURVEY, surveyList });
			});
	};
}

// action creators
export default function (state = initialState.surveyList, action) {
	switch (action.type) {
		case GET_SEARCHED_SURVEY:
			return Object.assign({}, state, action.surveyList);
		default:
			return state;
	}
}
