import React, { PropTypes } from 'react';
import { SearchBar } from './SearchBar';

export default class HomePage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>Home Page Works!</h1>
				{/*<SearchBar/>*/}
			</div>
		);
	}
}