import initialState from './initialState';

// actions
export const RECV_ERROR = 'RECV_ERROR';
export const REQ_DATA = 'REQ_DATA';
export const RECV_DATA = 'RECV_DATA';


// reducer
export default function(state = initialState.isLoading, action = null) {
	switch (action.type) {
		case RECV_ERROR:
			return Object.assign({}, state, { isLoading: false });
		case RECV_DATA:
			return Object.assign({}, state, { isLoading: false });
		case REQ_DATA:
			return Object.assign({}, state, { isLoading: true });
		default:
			return state;
	}
};

// action creators
export function requestData() {
	return {type: REQ_DATA}
};

export function receiveData() {
	return{type: RECV_DATA}
};

export function receiveError() {
	return {type: RECV_ERROR}
};
