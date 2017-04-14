import React from 'react';
import SearchBar from './SearchBar';

export default class HomePage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h2>Home Page</h2>
				<SearchBar />
			</div>
		);
	}
}