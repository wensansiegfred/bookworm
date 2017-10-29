import React, { Component } from "react";
import PropTypes from "prop-types";
import LoginForm from "../forms/LoginForm";

class LoginPage extends Component {	
	render() {
		const { history } = this.props;		
		return (
			<div>
				<h1>Login Page</h1>
				<LoginForm history={history}/>
			</div>
		);
	}	
}

export default LoginPage;