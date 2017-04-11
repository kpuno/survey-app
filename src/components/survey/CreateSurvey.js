import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as surveyActions from '../../reducers/survey';
import { Button, Form } from 'react-bootstrap';

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
			}]
		};

		this.textBoxChange = this.textBoxChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.dropDownChange = this.dropDownChange.bind(this);
		this.addInput = this.addInput.bind(this);
		this.addMultipleChoice = this.addMultipleChoice.bind(this);
		this.mcChange = this.mcChange.bind(this);
		this.titleChange = this.titleChange.bind(this);
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
		}
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

	onSubmit() {
		// event.preventDefault();
		let title = this.state.title;
		let survey = this.state.survey;
		let email = this.props.user.email;
		let newObj = {
			question: '',
			type: '',
			multiplechoice: [
				{ q1: '' },
				{ q2: '' },
				{ q3: '' },
				{ q4: '' }
			]
		}
		this.props.actions.addSurvey({ title, survey, email});
		this.setState({title: '', email: ''})
	}

	addMultipleChoice(input, index, val) {
		return (
			<div>
				<p>Multiple Choice</p>
				<input type="text" onChange={this.mcChange} key={val + 1 + "c"} name={0} id={val} />
				<br />
				<input type="text" onChange={this.mcChange} key={val + 2 + "c"} name={1} id={val} />
				<br />
				<input type="text" onChange={this.mcChange} key={val + 3 + "c"} name={2} id={val} />
				<br />
				<input type="text" onChange={this.mcChange} key={val + 4 + "c"} name={3} id={val} />
			</div>
		)
	}

	addInput(input, index, val) {
		return (
			<div>
				<p>Question {val}</p>
				<input type="text" onChange={this.textBoxChange} key={val + "q"} name={index} />
				<select onChange={this.dropDownChange} key={val} name={val}>
					<option value="agreedisagree">Agree/Disagree</option>
					<option value="shortanswer">Short Answer</option>
					<option value="multiplechoice">Multiple Choice</option>
				</select>
				<br /><br />
			</div>
		)
	}

	render() {
		return (
			<div>
				<Form>
					<h1>Create Survey</h1>
					<p>Title</p>
					<input type="text" onChange={this.titleChange} value={this.state.title} />
					<div id="dynamicInput">
						{this.state.survey.map((input, val = 0) => {
							val++;
							let index = val - 1;
							return (
								<div>
									{this.state !== null ? this.addInput(input, index, val) : ''}
									{input.type === 'multiplechoice' ? this.addMultipleChoice(input, index, val) : ''}
									{console.log(this.state.title)}
								</div>
							)
						})}
					</div>
				</Form>
				<Button onClick={() => this.appendInput()}>Add Question</Button>
				<Button onClick={this.onSubmit}>Add Survey</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateSurvey);