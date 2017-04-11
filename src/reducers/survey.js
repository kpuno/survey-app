import initialState from './initialState';
import axios from 'axios';
const HOST_URL = 'https://survey-app-api.herokuapp.com';

// actions
export const ADD_SURVEY_SUCCESS = 'ADD_SURVEY_SUCCESS';
export const GET_CURRENT_SURVEY = 'GET_CURRENT_SURVEY';
export const ADD_RESULTS = 'ADD_RESULTS';

// reducer
export function addSurvey({ title, survey, email }) {
	return function (dispatch) {
		axios.post(`${HOST_URL}/addsurvey`, { title, survey, email })
			.then(response => {
				// toastr added survey success
				// title is random change later	
				dispatch({ type: ADD_SURVEY_SUCCESS, title });
			})
			.then(axios.post(`${HOST_URL}/getusersurveys`, { email })
			.then(response => {
				getUserSurveys(dispatch, response.data);
			}))
			.catch(error => {
				authError(dispatch, error);
			})
	}
}

export function getSurvey(title) {
	return function (dispatch) {
		axios.post(`${HOST_URL}/searchsurveys`, { title })
			.then(response => {
				const currentSurvey = response.data;
				dispatch({ type: GET_CURRENT_SURVEY, currentSurvey });
			})
	}
}

export function addResults({title, results, email}) {
	return function (dispatch) {
		axios.post(`${HOST_URL}/addresults`, { title, email, results })
			.then(response => {
				dispatch({ type: ADD_RESULTS, response });
			})
	}
}

// action creators
export default function (state = initialState.currentSurvey, action) {
	switch (action.type) {
		case ADD_SURVEY_SUCCESS:
			return state;
		case ADD_RESULTS:
			return state;
		case GET_CURRENT_SURVEY:
			return Object.assign({}, state, action.currentSurvey);
		default:
			return state;
	}
}