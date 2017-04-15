import initialState from './initialState';
import axios from 'axios';
const HOST_URL = 'https://survey-app-api.herokuapp.com';
import { authError } from './auth';
import { requestData, receiveData } from './loading';

// actions
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const UPDATE_USER = 'UPDATE_USER';
export const GET_USER_SURVEYS_SUCCESS = 'GET_USER_SURVEYS_SUCCESS';

// reducer
// get user info is in auth
export function updateUser(currentEmail, email, displayName) {
	return function (dispatch) {
		axios.post(`${HOST_URL}/edituserinfo`, { currentEmail, email, displayName })
			.then(() => {
				// nothing to do
			})
			.then(axios.post(`${HOST_URL}/getuserinfo`, { email })
				.then(response => {
					let userInfo = response.data;
					dispatch({ type: GET_USER_SUCCESS, userInfo });
				})
				.then(() =>
					new Promise(resolve => {
						setTimeout(() => {
							axios.post(`${HOST_URL}/getuserinfo`, { email })
								.then(response => {
									getDisplayName(dispatch, response.data);
								})
								.then(axios.post(`${HOST_URL}/getusersurveys`, { email })
									.then(response => {
										dispatch(receiveData());
										getUserSurveys(dispatch, response.data);
									})
								);
							resolve();
						}, 2000);
					}))
				.catch(error => {
					authError(dispatch, error);
				})
				.catch(error => {
					return error;
				})
			)
	};
}

export function changePassword(email, displayName, password) {
	return function (dispatch) {
		dispatch(requestData());
		axios.post(`${HOST_URL}/changePassword`, { email })
			.then(() => {
			})
			.then(() =>
				new Promise(resolve => {
					setTimeout(() => {
						(axios.post(`${HOST_URL}/signup`, { email, password, displayName })
							.then(response => {
								dispatch(receiveData());
							})
						)
					}, 2000);
				}))
					.catch(error => {
						return error;
					})
			// )
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
	dispatch({ type: GET_USER_SURVEYS_SUCCESS, surveys });
}

export function getDisplayName(dispatch, userInfo) {
	dispatch({ type: GET_USER_SUCCESS, userInfo });
}