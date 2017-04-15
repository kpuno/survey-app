import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import * as actions from '../reducers/auth';

// dashboard anayltics settings

class NavBar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: ''
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.user != null) {
			console.log("I AM HEREERERERER!!!");
			this.setState({ username: nextProps.user });
		}
	}

	componentWillMount(){
		if (this.props.user != null) {
			console.log("I AM HEREERERERER!!!");
			this.setState({ username: this.props.user });
		}
	}

	onInputChange(event) {
		this.setState({ term: event.target.value });
	}

	handleSignOut() {
		this.props.deAuthUser();
	}

	headerLinks() {
		if (this.props.authenticated) {
			return (
				[
					<NavDropdown key={this.state.username} title={this.state.username}>
						<MenuItem><Link to="/editprofile" className="nav-link">Edit Profile</Link></MenuItem>
						<MenuItem><Link to="/changepassword" className="nav-link">Change Password</Link></MenuItem>
						<MenuItem><span key="signout" onClick={this.handleSignOut.bind(this)}><Link to="/" className="nav-link">Sign Out</Link></span></MenuItem>
					</NavDropdown>
				]
			);
		} else {
			return (
				[
					<LinkContainer key="signup" to={'/signin'}><NavItem>Sign In</NavItem></LinkContainer>
				]
			);
		}
	}

	render() {
		return (
			<Navbar inverse fluid>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to={'/'}>Survey App</Link>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav>
					<LinkContainer to={'/home'}><NavItem>Home</NavItem></LinkContainer>
					{this.props.authenticated ? <LinkContainer to={'/dashboard'}><NavItem>Dashboard</NavItem></LinkContainer> : null}
					{this.props.authenticated ? <LinkContainer to={'/analytics'}><NavItem>Analytics</NavItem></LinkContainer> : null}
					{/*this.props.authenticated ? <LinkContainer to={'/settings'}><NavItem>Settings</NavItem></LinkContainer> : null*/}
				</Nav>
				<Nav pullRight>
					{this.headerLinks()}
				</Nav>
			</Navbar>
		);
	}
}

NavBar.propTypes = {
	user: PropTypes.string,
	deAuthUser: PropTypes.func,
	authenticated: PropTypes.bool
};

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated,
		user: state.user.displayName
	};
}

export default connect(mapStateToProps, actions)(NavBar);