import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as surveyActions from '../../reducers/survey';
import { Button, Form, Label } from 'react-bootstrap';

class CreateSurvey extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			survey: [{
				question: '',
				type: 'agreedisagree',
				multiplechoice: [
					{ q1: '' },
					{ q2: '' },
					{ q3: '' },
					{ q4: '' }
				]
			}],
			expiryDate: ''
		};

		this.textBoxChange = this.textBoxChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.dropDownChange = this.dropDownChange.bind(this);
		this.addInput = this.addInput.bind(this);
		this.addMultipleChoice = this.addMultipleChoice.bind(this);
		this.mcChange = this.mcChange.bind(this);
		this.titleChange = this.titleChange.bind(this);
		this.dateChange = this.dateChange.bind(this);
		this.deleteQuestion = this.deleteQuestion.bind(this);
	}

	appendInput() {
		// let newInput = `question-${this.state.survey.length}`;
		let newObj = {
			question: '',
			type: 'agreedisagree',
			multiplechoice: [
				{ q1: '' },
				{ q2: '' },
				{ q3: '' },
				{ q4: '' }
			]
		};
		this.setState({ survey: this.state.survey.concat(newObj) });
	}

	// text box
	textBoxChange(e) {
		let stateCopy = Object.assign({}, this.state);
		stateCopy.survey = stateCopy.survey.slice();
		stateCopy.survey[e.target.name] = Object.assign({}, stateCopy.survey[e.target.name]);
		stateCopy.survey[e.target.name].question = e.target.value;
		this.setState(stateCopy);
	}

	// drop downs
	dropDownChange(e) {
		let stateCopy = Object.assign({}, this.state);
		stateCopy.survey = stateCopy.survey.slice();
		stateCopy.survey[e.target.name - 1] = Object.assign({}, stateCopy.survey[e.target.name - 1]);
		stateCopy.survey[e.target.name - 1].type = e.target.value;
		this.setState(stateCopy);
	}

	mcChange(e) {
		let stateCopy = Object.assign({}, this.state);
		stateCopy.survey = stateCopy.survey.slice();
		stateCopy.survey[e.target.id - 1] = Object.assign({}, stateCopy.survey[e.target.id - 1]);
		stateCopy.survey[e.target.id - 1].multiplechoice[e.target.name] = e.target.value;
		this.setState(stateCopy);
	}

	titleChange(e) {
		this.setState({ title: e.target.value });
	}

	dateChange(e) {
		this.setState({ expiryDate: e.target.value });
	}

	// 	function myFunction() {
	// 	var date = '2015-12-04';
	// 	var d = new Date(date);
	// 	var n = d.toDateString();
	// 	document.getElementById("demo").innerHTML = n;
	// }

	onSubmit() {
		// event.preventDefault();
		let title = this.state.title;
		let survey = this.state.survey;
		let email = this.props.user.email;
		let date = new Date(this.state.expiryDate);
		// let newObj = {
		// 	question: '',
		// 	type: '',
		// 	multiplechoice: [
		// 		{ q1: '' },
		// 		{ q2: '' },
		// 		{ q3: '' },
		// 		{ q4: '' }
		// 	]
		// }
		this.props.actions.addSurvey({ title, survey, email, date });
		this.setState({ title: '', email: '', date: '' });
	}

	addMultipleChoice(input, index, val) {
		return (
			<div>
				<strong>Multiple Choice</strong>
				<div className="input-group">
					<span className="input-group-addon">
						<strong>1</strong>
					</span>
					<input className="form-control" type="text" onChange={this.mcChange} key={val + 1 + "c"} name={0} id={val} />
				</div>
				<div className="input-group">
					<span className="input-group-addon">
						<strong>2</strong>
					</span>
					<input className="form-control" type="text" onChange={this.mcChange} key={val + 2 + "c"} name={1} id={val} />
				</div>
				<div className="input-group">
					<span className="input-group-addon">
						<strong>3</strong>
					</span>
					<input className="form-control" type="text" onChange={this.mcChange} key={val + 3 + "c"} name={2} id={val} />
				</div>
				<div className="input-group">
					<span className="input-group-addon">
						<strong>4</strong>
					</span>
					<input className="form-control" type="text" onChange={this.mcChange} key={val + 4 + "c"} name={3} id={val} />
				</div>
			</div>
		);
	}

	deleteQuestion(e) {
		let newData = this.state.survey.slice();
		newData.splice(e.target.name, 1);
		this.setState({ survey: newData});
	}

	addInput(input, index, val) {
		return (
			<div className="input-group row">
				<span className="input-group-addon">
					<strong>Question {val}</strong>
				</span>
				<input className="form-control" type="text" onChange={this.textBoxChange} key={val + "q"} name={index} />
				<select className="form-control" onChange={this.dropDownChange} key={val} name={val}>
					<option value="agreedisagree">Agree/Disagree</option>
					<option value="shortanswer">Short Answer</option>
					<option value="multiplechoice">Multiple Choice</option>
				</select>
				<div className="input-group-btn input-lg">
					<Button bsStyle="danger" name={val} onClick={this.deleteQuestion}>Delete Question</Button>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="container">
				<h1>Create Survey</h1>
				<div className="row">
					<div className="col-lg">
						<div className="panel panel-default">
							<div className="panel-heading">
								<div className="form-group">
									<div className="input-group">
										<span className="input-group-addon">
											<strong>Title</strong>
										</span>
										<input className="form-control input-lg" name="text" type="text" onChange={this.titleChange} value={this.state.title} />
									</div>
								</div>
							</div>
							<form className="form-group">
								<div className="panel-body">
									<div className="row">
										<div className="col-sm-12 col-md-10  col-md-offset-1 ">
											<div className="form-group">
												<div className="input-group row">
													<span className="input-group-addon">
														<strong>Expiry Date</strong>
													</span>
													<input className="form-control input-lg" name="password" type="text" onChange={this.dateChange} value={this.state.expiryDate} />
												</div>
												<hr />
												<div id="dynamicInput">
													{this.state !== null || this.state !== undefined ? this.state.survey.map((input, val = 0) => {
														val++;
														console.log(this.state.survey)
														let index = val - 1;
														return (
															<div key={val + 'd'}>
																{this.addInput(input, index, val)}
																{input.type === 'multiplechoice' ? this.addMultipleChoice(input, index, val) : ''}
																<hr />
															</div>
														);
													}) : null}
												</div>
											</div>
										</div>
									</div>
								</div>
							</form>
							<div className="panel-footer ">
								<Button bsStyle="primary" onClick={() => this.appendInput()}>Add Question</Button>
								<Button className="pull-right" bsStyle="success" onClick={this.onSubmit}>Add Survey</Button>
							</div>
						</div>
					</div>
				</div >
			</div >
		);
	}
}

CreateSurvey.propTypes = {
	actions: PropTypes.func,
	user: PropTypes.object
};

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(surveyActions, dispatch)
	};
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSurvey);