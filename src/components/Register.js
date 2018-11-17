import React from 'react'
import './Register.css';

class Register extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({ email: event.target.value });
	}

	onPasswordChange = (event) => {
		this.setState({ password: event.target.value })
	}

	onNameChange = (event) => {
		this.setState({ name: event.target.value });
	}

	onSubmitSignIn = () => {
		fetch('http://localhost:3000/register', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				}
			});
	}

	render() {
		return (
			<div className="Register-container textShadow" >
				<h1>Registration</h1>
				{/* <form className="Register-form"> */}
				<input type="text" placeholder="Your Name" onChange={this.onNameChange} />
				<input type="email" placeholder="Your Email" onChange={this.onEmailChange} />
				<input type="password" placeholder="Create Password" onChange={this.onPasswordChange} />
				<button
					type="submit"
					onClick={this.onSubmitSignIn}>Register</button>
				{/* </form> */}
			</div>
		)
	}
}

export default Register