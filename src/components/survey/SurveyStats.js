import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as resultsActions from '../../reducers/results';
import { Button } from 'react-bootstrap';

class SurveyStats extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			respondents: '',
			questions: []
		};

		this.shortAnswerResults = this.shortAnswerResults.bind(this);
		this.multipleChoiceResults = this.multipleChoiceResults.bind(this);
		this.agreeDisagreeResults = this.agreeDisagreeResults.bind(this);
		this.downloadCSV = this.downloadCSV.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (Object.keys(nextProps.results).length !== 0) {
			let respondents = 0;
			let questions = [];

			Object.keys(nextProps.results[0].results).map((res) => {
				questions.push({
					title: nextProps.results[0].results[res].question,
					type: nextProps.results[0].results[res].type,
					results: []
				});
			});

			Object.keys(nextProps.results).map((key) => {
				respondents++;
				Object.keys(nextProps.results[key].results).map((res) => {
					questions[res].results.push(nextProps.results[key].results[res].answer);
					res++;
				});
			});

			questions.map((question) => {
				let obj = {};
				let newArray = [];
				if (question.type === 'multiplechoice') {
					for (let i = 0, j = question.results.length; i < j; i++) {
						obj[question.results[i]] = (obj[question.results[i]] || 0) + 1;
					}

					for (let o in obj) {
						if (typeof obj[o] !== 'function') {
							newArray.push({ [o]: obj[o] });
						}
					}

					question.results = newArray;
				}
			});
			this.setState({ questions: questions, title: this.props.params.title });
		}
	}

	componentWillUnmount() {
		let empty = {};
		this.props.actions.unmountSearchResults(empty);
	}

	shortAnswerResults(answer, i) {
		return (
			<p key={i}>{answer}</p>
		);
	}

	multipleChoiceResults(answer) {
		for (let key in answer) {
			if (typeof answer[key] !== 'function') {
				return (<p>{key + ": " + answer[key]}</p>);
			}
		}
	}

	agreeDisagreeResults(question) {
		let stronglyagree;
		let agree;
		let disagree;
		let stronglydisagree;

		stronglyagree = question.results.reduce((count, answer) => {
			if (answer === "stronglyagree") {
				count++;
			}
			return count;
		}, 0);

		agree = question.results.reduce((count, answer) => {
			if (answer === "agree") {
				count++;
			}
			return count;
		}, 0);

		disagree = question.results.reduce((count, answer) => {
			if (answer === "disagree") {
				count++;
			}
			return count;
		}, 0);

		stronglydisagree = question.results.reduce((count, answer) => {
			if (answer === "stronglydisagree") {
				count++;
			}
			return count;
		}, 0);

		return (
			<div>
				<strong>Strongly Agree: </strong> {stronglyagree}
				<br />
				<strong>Agree: </strong>	{agree}
				<br />
				<strong>Disagree: </strong>	{disagree}
				<br />
				<strong>Strongly Disagree: </strong> {stronglydisagree}
			</div>
		);
	}

	downloadCSV() {
		let data = new Blob([JSON.stringify(this.state)], { type: 'text/csv' });
		let csvURL = window.URL.createObjectURL(data);
		let tempLink = document.createElement('a');
		tempLink.href = csvURL;
		tempLink.setAttribute('download', 'surveystats.json');
		tempLink.click();
		// window.open(tempLink);
	}

	render() {
		return (
			<div>
				<h1>Survey Stats</h1>
				<div className="container">
					<div className="row">
						<div className="col-lg">
							<div className="panel panel-default">
								<div className="panel-heading">
									<h2>{this.state.title}</h2>
								</div>
							</div>
						</div>
						<div className="panel-body">
							<div className="row">
								<div className="col-sm-12 col-md-10  col-md-offset-1 ">
									{this.state.respondents ? <div><strong>Number of respondents:</strong> this.state.respondents</div> : null}
									{this.state.questions.length !== 0 ? this.state.questions.map((question, i = 0) => {
										i++;
										return (
											<div key={i + 'd'}>
												<strong>{question.title}</strong>
												<br />
												{
													question.type === 'agreedisagree' ?
														this.agreeDisagreeResults(question) : null
												}
												{
													question.type === 'multiplechoice' ?
														question.results.map((answer) => {
															return this.multipleChoiceResults(answer);
														}) : null
												}
												{
													question.type === 'shortanswer' ?
														question.results.map((answer, i) => {
															i++;
															return this.shortAnswerResults(answer);
														}) : null
												}
												<br />
											</div>
										);
									}) : <h1>No Surveys Submitted Yet</h1>}
								</div>
							</div>
						</div>
						<div className="panel-footer ">
							<Button bsStyle="primary" download="stats.csv" onClick={this.downloadCSV}>Download</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

SurveyStats.propTypes = {
	results: PropTypes.object,
	actions: PropTypes.func
};

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(resultsActions, dispatch)
	};
}

function mapStateToProps(state) {
	return {
		results: state.resultsList
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyStats);