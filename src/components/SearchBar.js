import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as searchActions from '../reducers/search';
import { bindActionCreators } from 'redux';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			term: ''
		};

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onFormSubmit(event) {
		event.preventDefault();
		this.props.actions.searchSurvey(this.state.term);
		this.redirect();
		this.setState({ term: '' });
	}

	redirect() {
		browserHistory.push('/searchsurvey');
	}

	onInputChange(event) {
		this.setState({ term: event.target.value });
	}

	render() {
		return (
				<form /*onSubmit={this.onFormSubmit}*/>
					<FormGroup>
						<InputGroup>
							<FormControl
								type="text"
								value={this.state.term}
								placeholder="Search for.."
								onChange={this.onInputChange}
							/>
							<Button bsStyle="primary" onClick={this.onFormSubmit}>Search</Button>
						</InputGroup>
					</FormGroup>
				</form>
		);
	}
}

SearchBar.propTypes = {
	event: PropTypes.object,
	actions: PropTypes.func
};

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(searchActions, dispatch)
	};
}

export default connect(null, mapDispatchToProps)(SearchBar);