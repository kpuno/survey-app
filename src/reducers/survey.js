import initialState from './initialState';
import axios from 'axios';
const HOST_URL = 'https://survey-app-api.herokuapp.com';
import { getUserSurveys } from './user';
import { authError } from './auth';
import { requestData, receiveData } from './loading';

// actions
export const ADD_SURVEY_SUCCESS = 'ADD_SURVEY_SUCCESS';
export const GET_CURRENT_SURVEY = 'GET_CURRENT_SURVEY';
export const ADD_RESULTS = 'ADD_RESULTS';
export const DELETE_SURVEY = 'DELETE_SURVEY';
export const EDIT_SURVEY = 'EDIT_SURVEY';

// reducer
export function addSurvey({ title, survey, email, date }) {
	return function (dispatch) {
		dispatch(requestData());
		axios.post(`${HOST_URL}/addsurvey`, { title, survey, email, date })
			.then(response => {
				// toastr added survey success
				// title is random change later	
				dispatch({ type: ADD_SURVEY_SUCCESS, response });
			})
			.then(axios.post(`${HOST_URL}/getusersurveys`, { email })
				.then(response => {
					dispatch(receiveData());
					getUserSurveys(dispatch, response.data);
				}))
			.catch(error => {
				authError(dispatch, error);
			});
	};
}

export function getSurvey(title, email) {
	return function (dispatch) {
		dispatch(requestData());
		axios.post(`${HOST_URL}/searchsurveys`, { title, email })
			.then(response => {
				dispatch(receiveData());
				const currentSurvey = response.data;
				dispatch({ type: GET_CURRENT_SURVEY, currentSurvey });
			})
			.catch(error => {
				authError(dispatch, error);
			});
	};
}

export function deleteSurvey(title, email) {
	return function (dispatch) {
		dispatch(requestData());
		axios.post(`${HOST_URL}/deletesurvey`, { title, email })
			.then(response => {
				dispatch(receiveData());
				const currentSurvey = response.data;
				dispatch({ type: DELETE_SURVEY, currentSurvey });
			})
			.then(axios.post(`${HOST_URL}/getusersurveys`, { email })
				.then(response => {
					dispatch(receiveData());
					getUserSurveys(dispatch, response.data);
				})
				.catch(error => {
					authError(dispatch, error);
				})
			);
	};
}

export function editSurvey(title, email, expiryDate) {
	return function (dispatch) {
		dispatch(requestData());
		axios.post(`${HOST_URL}/editexiprydate`, { title, email, expiryDate })
			.then(response => {
				dispatch(receiveData());
				const currentSurvey = response.data;
				dispatch({ type: EDIT_SURVEY, currentSurvey });
			})
			.then(axios.post(`${HOST_URL}/getusersurveys`, { email })
				.then(response => {
					dispatch(receiveData());
					getUserSurveys(dispatch, response.data);
				})
				.catch(error => {
					authError(dispatch, error);
				})
			);
	};
}

export function addResults({ title, results, email }) {
	return function (dispatch) {
		dispatch(requestData());
		axios.post(`${HOST_URL}/addresults`, { title, email, results })
			.then(response => {
				dispatch(receiveData());
				dispatch({ type: ADD_RESULTS, response });
			});
	};
}

// action creators
export default function (state = initialState.currentSurvey, action) {
	switch (action.type) {
		case ADD_SURVEY_SUCCESS:
			return state;
		case ADD_RESULTS:
			return state;
		case DELETE_SURVEY:
			return state;
			case EDIT_SURVEY:
			return state;
		case GET_CURRENT_SURVEY:
			return Object.assign({}, state, action.currentSurvey);
		default:
			return state;
	}
}