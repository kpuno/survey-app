import initialState from './initialState';
import axios from 'axios';
const HOST_URL = 'https://survey-app-api.herokuapp.com';

// actions
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const UPDATE_USER = 'UPDATE_USER';
export const GET_USER_SURVEYS_SUCCESS = 'GET_USER_SURVEYS_SUCCESS';

// reducer
// get user info is in auth
export function updateUser(currentEmail, email, displayName) {
	return function (dispatch) {
		axios.post(`${HOST_URL}/edituserinfo`, { currentEmail, email, displayName })
			.then(response => {
				// nothing to do
			})
			.then(axios.post(`${HOST_URL}/getuserinfo`, { email })
				.then(response => {
					let userInfo = response.data;
					dispatch({ type: GET_USER_SUCCESS, userInfo });
				})
				.catch(error => {
					console.log(error);
				}))
			.catch(error => {
				authError(dispatch, error);
			})
			.catch(error => {
				return error;
			});
	};
}

// export function getUserSurveys(email) {
// 	return function (dispatch) {
// 		axios.post(`${HOST_URL}/getusersurveys`, { email })
// 			.then(response => {
// 				const surveys = response.data;
// 				dispatch({ type: GET_USER_SURVEYS_SUCCESS, surveys});
// 			})
// 			.catch(error => {
// 				console.log(error);
// 			});
// 	};
// }

// action creators
export default function (state = initialState.user, action) {
	switch (action.type) {
		case GET_USER_SUCCESS:
			return Object.assign({}, state, { displayName: action.userInfo.displayName, email: action.userInfo.email });
		case GET_USER_SURVEYS_SUCCESS:
			return Object.assign({}, state, { surveys: action.surveys });
		default:
			return state;
	}
}

export function getUserSurveys(dispatch, surveys) {
	dispatch({ type: GET_USER_SURVEYS_SUCCESS, surveys});
}

export function displayName(dispatch, userInfo) {
	dispatch({ type: GET_USER_SUCCESS, userInfo });
}