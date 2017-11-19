import React, { Component } from "react";
import PropTypes from "prop-types";
import LoginForm from "../forms/LoginForm";
import { Link } from "react-router-dom";

class LoginPage extends Component {	
	render() {
		const { history } = this.props;		
		return (
			<div>
				<h1>Login Page</h1>
				<LoginForm history={history}/>

				<Link to="/forgot_password">Forgot Password</Link>
			</div>
		);
	}	
}

export default LoginPage;