import React from 'react'
import './Register.css';

const Register = ({ onRouteChange }) => {
	return (
		<div className="Register-container textShadow">
			<h1>Registration</h1>
			<form className="Register-form">
				<input type="text" placeholder="Your Name" />
				<input type="email" placeholder="Your Email" />
				<input type="password" placeholder="Create Password" />
				<button
					type="submit"
					id="registrer-button"
					onClick={() => onRouteChange('home')}>Register</button>
			</form>
		</div>
	)
}

export default Register
