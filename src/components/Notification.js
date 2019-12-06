import React from 'react'


const Notification = ({ error, message }) => {
	if (message === undefined || message === null) {
		return null
	}

	const errorStyle = {
		color: '#993300',
		backgroundColor: 'grey',
		padding: 10
	}

	const normalStyle = {
		padding: 10,
		color: 'green',
	}

	if (error) {
		return <div style={errorStyle}>{message}</div>
	}

	if (!error) {
		return <div style={normalStyle}>{message}</div>
	}
}

export default Notification