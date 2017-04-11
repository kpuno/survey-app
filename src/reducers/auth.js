import axios from 'axios';
import { browserHistory } from 'react-router';
import initialState from './initialState';
import { displayName, getUserSurveys } from './user';
const HOST_URL = 'https://survey-app-api.herokuapp.com';

// actions
const AUTH_USER = 'AUTH_USER';
const DE_AUTH_USER = 'DE_AUTH_USER';
const AUTH_ERROR = 'AUTH_ERROR';
const FETCH_DATA = 'FETCH_DATA';

// reducers
export default function (state = initialState.auth, action) {
	switch (action.type) {
		case AUTH_USER:
			return Object.assign({}, state, { authenticated: true });
		case DE_AUTH_USER:
			return Object.assign({}, state, { authenticated: false });
		case AUTH_ERROR:
			return Object.assign({}, state, { error: action.message });
		case FETCH_DATA:
			return Object.assign({}, state, { protectedData: action.data });
		default:
			return state;
	}
}

// action creators
export function signInUser({ email, password }) {
	return function (dispatch) {
		axios.post(`${HOST_URL}/signin`, { email, password })
			.then(response => {
				authorizeUser(dispatch, response.data.token, email);
			})
			.then(axios.post(`${HOST_URL}/getuserinfo`, { email })
			.then(response => {
				displayName(dispatch, response.data);
			})
			.then(axios.post(`${HOST_URL}/getusersurveys`, { email })
			.then(response => {
				getUserSurveys(dispatch, response.data);
			})
			))
			.catch(error => {
				authError(dispatch, error);
			});
	};
}

export function signUpUser({ email, password, displayName }) {
	return function (dispatch) {
		axios.post(`${HOST_URL}/signup`, { email, password, displayName })
			.then(response => {
				authorizeUser(dispatch, response.data.token);
			})
			.catch(error => {
				authError(dispatch, error);
			});
	};
}

export function deAuthUser() {
	return function (dispatch) {
		localStorage.removeItem('token');
		clearState(dispatch);
	};
}

export function fetchData() {
	return function (dispatch) {
		const token = localStorage.getItem('token');
		axios.get(`${HOST_URL}`, {
			headers: { authorization: token }
		})
			.then(res => {
				axios.get(`${res.data.secretAPI}`)
					.then(response => {
						dispatch({ type: FETCH_DATA, data: response.data });
					})
					.catch(error => authError(dispatch, error));
			})
			.catch(error => authError(dispatch, error));
	};
}

export function authError(dispatch, error) {
	dispatch({ type: AUTH_ERROR, message: error.message });
}

function authorizeUser(dispatch, token) {
	dispatch({ type: AUTH_USER });
	localStorage.setItem('token', token);
	browserHistory.push('/home');
}

function clearState(dispatch) {
	dispatch({ type: DE_AUTH_USER });
}