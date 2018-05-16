import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css';
import logoImg from './logo.svg'

const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt className="Tilt br3 shadow-2" options={{ max: 25 }} style={{ height: 140, width: 140 }} >
				<div className="Tilt-inner">
					<img src={logoImg} alt="Logo Img" />
				</div>
			</Tilt>
		</div>
	)
}

export default Logo