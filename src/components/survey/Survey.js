import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as surveyActions from '../../reducers/survey';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import toastr from 'toastr';

class Survey extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			email: '',
			results: [],
			survey: []
		};

		this.renderSurvey = this.renderSurvey.bind(this);
		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps !== null || nextProps !== undefined) {
			const obj = nextProps.survey[0].survey.map((questions) => {
				let newObj = {
					question: questions.question,
					answer: '',
					type: questions.type
				};
				return newObj;
			});
			this.setState({ title: nextProps.survey[0].title, email: nextProps.survey[0].email, survey: nextProps.survey[0], results: obj });
		}
	}

	handleOptionChange(e) {
		let stateCopy = Object.assign({}, this.state);
		stateCopy.results = Object.assign({}, stateCopy.results);
		stateCopy.results[e.target.name].answer = e.target.value;
		this.setState(stateCopy);
	}

	handleTextBoxChange(e) {
		let stateCopy = Object.assign({}, this.state);
		stateCopy.results = Object.assign({}, stateCopy.results);
		stateCopy.results[e.target.name].answer = e.target.value;
		this.setState(stateCopy);
	}

	onSubmit() {
		let title = this.state.title;
		let results = this.state.results;
		let email = this.state.email;
		this.props.actions.addResults({ title, results, email });
		browserHistory.push('/searchsurvey');
		toastr.success('Survey answers submitted!');
	}

	renderSurvey(question, num) {
		return (
			<div key={num + 'd'}>
				<strong>{question.question}</strong>
				<br />
				{question.type === 'agreedisagree' ?
					<div>
						<div className="radio">
							<label><input type="radio" onClick={this.handleOptionChange} name={num - 1} checked={this.state.results[num - 1].answer === 'stronglyagree'} value="stronglyagree" />Strongly Agree</label>
						</div>
						<div className="radio">
							<label><input type="radio" onClick={this.handleOptionChange} name={num - 1} checked={this.state.results[num - 1].answer === 'agree'} value="agree" />Agree</label>
						</div>
						<div className="radio">
							<label><input type="radio" onClick={this.handleOptionChange} name={num - 1} checked={this.state.results[num - 1].answer === 'disagree'} value="disagree" />Disagree</label>
						</div>
						<div className="radio">
							<label><input type="radio" onClick={this.handleOptionChange} name={num - 1} checked={this.state.results[num - 1].answer === 'stronglydisagree'} value="strongdisagree" />Strongy Disagree</label>
						</div>
					</div>
					: null}
				{question.type === 'shortanswer' ? <textarea className="form-control" onChange={this.handleOptionChange} name={num - 1} value={this.state.results[num - 1].answer} /> : null}
				{question.type === 'multiplechoice' ?
					<div>
						<div className="radio">
							<label><input type="radio" onClick={this.handleOptionChange} name={num - 1} checked={this.state.results[num - 1].answer === question.multiplechoice[0]} value={question.multiplechoice[0]} />{question.multiplechoice[0]}</label>
						</div>
						<div className="radio">
							<label><input type="radio" onClick={this.handleOptionChange} name={num - 1} checked={this.state.results[num - 1].answer === question.multiplechoice[1]} value={question.multiplechoice[1]} />{question.multiplechoice[1]}</label>
						</div>
						<div className="radio">
							<label><input type="radio" onClick={this.handleOptionChange} name={num - 1} checked={this.state.results[num - 1].answer === question.multiplechoice[2]} value={question.multiplechoice[2]} />{question.multiplechoice[2]}</label>
						</div>
						<div className="radio">
							<label><input type="radio" onClick={this.handleOptionChange} name={num - 1} checked={this.state.results[num - 1].answer === question.multiplechoice[3]} value={question.multiplechoice[3]} />{question.multiplechoice[3]}</label>
						</div>
					</div> : null}
				<br />
			</div>
		);
	}

	render() {
		return (
			<div className="container">
				{console.log(this.state)}
				<div className="row">
					<div className="col-lg">
						<div className="panel panel-default">
							<div className="panel-heading">
								<div className="form-group">
									<div className="input-group">
										<h1>{this.state.survey !== undefined ? this.state.survey.title : 'Survey Works!'}</h1>
									</div>
								</div>
							</div>
							<div className="panel-body">
								<div className="row">
									<div className="col-sm-12 col-md-10  col-md-offset-1 ">
										<div className="form-group">
											{this.state.survey.length != 0 ?
												this.state.survey.survey.map((question, num = 0) => {
													num++;
													return this.renderSurvey(question, num);
												})
												: null}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="panel-footer ">
							<Button bsStyle="success" onClick={this.onSubmit}>Submit Survey</Button>
						</div>
					</div>
				</div>
			</div >
		);
	}
}

Survey.propTypes = {
	actions: PropTypes.func
};

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(surveyActions, dispatch)
	};
}

function mapStateToProps(state) {
	return {
		survey: state.currentSurvey
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Survey);