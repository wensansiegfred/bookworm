import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import Validator from "validator";
import InlineError from "../messages/InlineError";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				email: "",
				password: ""
			},
			loading: false,
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {		
		this.setState({ 
			data: { 
				"email": (e.target.name == "email") ? e.target.value : this.state.data.email,
				"password": (e.target.name == "password") ? e.target.value : this.state.data.password
			}
		})
	}

	onSubmit(e) {
		e.preventDefault();
		const { history } = this.props;		
		const errors = this.validate(this.state.data);
		this.setState({ errors });

		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.login(this.state.data)
				.then((response) => {					
					history.push("/dashboard");
				},
				(error) => {					
					this.setState({ errors: error.response.data.errors, loading: false })
				});
		}
	}

	validate(data) {		
		const errors = {};
		if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
		if (!data.password) errors.password = "Can't be blank";
		return errors;
	}

	render() {
		const { data, errors, loading } = this.state;
		return (
			<Form onSubmit={this.onSubmit} loading={loading}>
				{ errors.global && <Message negative>
					<Message.Header>Something went wrong</Message.Header>
					<p>{ errors.global }</p>
					</Message>
				}
				<Form.Field error={!!errors.email}>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="example@example.com"
						value={data.email}
						onChange={this.onChange} />
					{ errors.email && <InlineError text={errors.email} />}
				</Form.Field>				
				<Form.Field error={!!errors.password}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={data.password}
						placeholder="Make it secure"
						onChange={this.onChange} />
					{ errors.password && <InlineError text={errors.password} />}
				</Form.Field>				
				<Button primary>Login</Button>
			</Form>
		);
	}
}

LoginForm.propTypes = {		
  	login: PropTypes.func.isRequired,
  	history: PropTypes.object
};

export default connect(null, { login })(LoginForm);