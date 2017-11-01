import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import Validator from "validator";
import InlineError from "../messages/InlineError";

class SignUpForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				email: "",
				password: ""
			},
			loading: false,
			errors: {}
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data)
				.catch(err => {	
					console.log(err.response)				
					this.setState({ errors: err.response.data.errors, loading: false })	
				});
		}
	}

	onChange(e) {
		this.setState({ 
			data: { 
				email: (e.target.name == "email") ? e.target.value : this.state.data.email,
				password: (e.target.name == "password") ? e.target.value : this.state.data.password
			}
		})
	}

	validate(data) {		
		const errors = {};
		if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
		if (!data.password) errors.password = "Can't be blank";
		return errors;
	}

	render() {
		const { data, errors, loading } = this.state;		
		return(
			<Form onSubmit={this.onSubmit} loading={ loading }>
				<Form.Field error={!!errors.email}>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="email@email.com"
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
						onChange={this.onChange} />
					{ errors.password && <InlineError text={errors.password} />}
				</Form.Field>

				<Button primary>Sign Up</Button>
			</Form>
		);
	}
}

SignUpForm.propTypes = {
	submit: PropTypes.func.isRequired
}

export default SignUpForm;