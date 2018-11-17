import React from 'react'

const Rank = ({ name, entries }) => {
	return (
		<div className='rank-container'>
			<div className="balck f2">
				{entries}
			</div>
			<div className="balck f3">
				{`this is, your current rank ${name}.`}
			</div>
		</div>
	)
}

export default Rank