import React from 'react'
import './SignIn.css';

const SignIn = ({ onRouteChange }) => {
	return (
		<div className="SignIn-container textShadow">
			<h1>Welcome</h1>
			<form className="SignIn-form">
				<input type="text" placeholder="Username" />
				<input type="password" placeholder="Password" />
				<button type="submit" id="login-button" onClick={() => onRouteChange('home')}>Login</button>
				<p
					className="register"
					onClick={() => onRouteChange('register')}
				>Register</p>
			</form>
		</div>
	)
}

export default SignIn