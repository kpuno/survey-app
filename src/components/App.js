import React, { PropTypes } from 'react';
import NavBar from './NavBar';
import Spinner from './Spinner';
import { connect } from 'react-redux';
const ImgVar = "http://linkword-pro.fr/images/background2.jpg";
import LandingPage from './LandingPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.


class App extends React.Component {

	renderThis() {
		return (
			<LandingPage />
		)
	}

	render() {
		return (
			<div>
				<NavBar />
				{this.props.location.pathname === '/' ? this.renderThis() :
					<div className="container">
						{this.props.isLoading.isLoading ? <Spinner /> : this.props.children}
					</div>
				}
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.element,
	isLoading: PropTypes.bool
};

function mapStateToProps(state) {
	return {
		isLoading: state.isLoading
	};
}

export default connect(mapStateToProps)(App);