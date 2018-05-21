import React from 'react'
import './SignIn.css';


class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value });
	}

	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value })
	}

	onSubmitSignIn = () => {
		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(response => response.json())
			.then(data => {
				if (data === 'success') {
					this.props.onRouteChange('home');
				}
			});
	}

	render() {
		const { onRouteChange } = this.props;
		return (
			<div className="SignIn-container textShadow" >
				<h1>Welcome</h1>
				{/* <form className="SignIn-form"> */}
				<input type="text" placeholder="Username" onChange={this.onEmailChange} />
				<input type="password" placeholder="Password" onChange={this.onPasswordChange} />
				<button
					type="submit"
					onClick={this.onSubmitSignIn}>Login</button>
				<p
					className="register"
					onClick={() => onRouteChange('register')}>Register</p>
				{/* </form> */}
			</div>
		)
	}
}

export default SignIn