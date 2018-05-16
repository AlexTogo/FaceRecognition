import React from 'react'

const FaceRecognition = ({ imageURL }) => {
	return (
		<div className="center ma">
			<div className="absolut mt2">
				<img src={imageURL} alt="img" width='530px' height='auto' />
			</div>
		</div>
	)
}

export default FaceRecognition
