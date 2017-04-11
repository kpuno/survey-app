import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as surveyActions from '../../reducers/survey';
import { Button, Form } from 'react-bootstrap';

class SearchSurvey extends Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return (
			<div>
				<h1>Search Page Works</h1>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(surveyActions, dispatch)
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchSurvey);