import React from 'react'
import './Navigation.css';

const Navigation = ({ onRouteChange }) => {
	return (
		<nav className='navFix'>
			<p onClick={() => onRouteChange('signin')} className='link dim pointer textShadow'>Sign Out</p>
		</nav>
	);
}

export default Navigation;