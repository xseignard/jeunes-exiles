import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Button = props => {
	const handleGo = () => props.history.push(props.link);
	return (
		<RaisedButton
			label={props.label}
			backgroundColor="#d67c30"
			className={props.className}
			labelStyle={{
				fontFamily: 'helvetica-condensed',
				fontWeight: 'bold',
				color: '#444',
			}}
			style={{
				width: '100%',
				backgroundColor: 'rgba(255, 255, 255, 0)',
			}}
			onClick={handleGo}
		/>
	);
};

export default Button;
