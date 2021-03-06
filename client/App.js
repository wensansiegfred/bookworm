import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import SignUpPage from "./components/pages/SignUpPage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import PropTypes from "prop-types";

const App = ({ location }) => (	
	<div className="ui container">
		<Route location={ location } path="/" exact component={HomePage} />
		<GuestRoute location={ location } path="/signup" exact component={SignUpPage} />
		<GuestRoute location={location} path="/login" exact component={LoginPage} />
		<GuestRoute location={ location } path="/forgot_password" exact component={ForgotPasswordPage} />
		<UserRoute location={ location } path="/dashboard" exact component={DashboardPage} />
	</div>
);

App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired
}

export default App;
