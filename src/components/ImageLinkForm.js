import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div className='contFix'>
			<p>{'We Will detec faces in your pictures.'}</p>
			<div className='form' >
				<input type="text" placeholder="Insert Image URL" onChange={onInputChange} />
				<button id="Detect-button" onClick={onButtonSubmit}>Detect</button>
			</div>
		</div>
	)
}

export default ImageLinkForm
