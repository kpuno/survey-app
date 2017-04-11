import initialState from './initialState';
import axios from 'axios';
const HOST_URL = 'https://survey-app-api.herokuapp.com';

// actions
export const GET_SEARCHED_SURVEY = 'GET_SEARCHED_SURVEY';

// reducer
export function searchSurvey(title) {
	return function (dispatch) {
		axios.post(`${HOST_URL}/getallsurveys`, { title })
			.then(response => {
				const surveyList = response.data;
				dispatch({ type: GET_SEARCHED_SURVEY, surveyList });
			})
	}
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
