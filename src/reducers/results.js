import initialState from './initialState';
import axios from 'axios';
const HOST_URL = 'https://survey-app-api.herokuapp.com';

// actions
export const GET_SEARCHED_RESULTS = 'GET_SEARCHED_RESULTS';
export const UMOUNT_SEARCHED_RESULTS = 'UMOUNT_SEARCHED_RESULTS';

// reducer
export function searchResults(title, email) {
	return function (dispatch) {
		axios.post(`${HOST_URL}/searchresults`, { title, email })
			.then(response => {
				const resultsList = response.data;
				dispatch({ type: GET_SEARCHED_RESULTS, resultsList });
			});
	};
}

// action creators
export default function (state = initialState.resultsList, action) {
	switch (action.type) {
		case GET_SEARCHED_RESULTS:
			return Object.assign({}, state, action.resultsList);
		case UMOUNT_SEARCHED_RESULTS:
			return Object.assign({}, action.empty);
		default:
			return state;
	}
}

export function unmountSearchResults(empty) {
	return function(dispatch) {
		dispatch({type: UMOUNT_SEARCHED_RESULTS, empty});
	};
}
