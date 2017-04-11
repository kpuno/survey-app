import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as surveyActions from '../../reducers/survey';
import SearchBar from '../SearchBar';

class SearchSurvey extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div>
				<h1>Search Page Works</h1>
				<SearchBar />
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(surveyActions, dispatch)
	};
}

SearchSurvey.propTypes = {
	user: PropTypes.obj
};

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchSurvey);