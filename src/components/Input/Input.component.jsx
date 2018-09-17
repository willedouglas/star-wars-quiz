import React from 'react';
import PropTypes from 'prop-types';

import './Input.style.scss';

class Input extends React.Component {
	render() {
		const { placeholder, type, style, onChange, name, value, className } = this.props;

		return (
			<input 
				className={`form-input ${className}`}
				name={name} 
				value={value} 
				placeholder={placeholder} 
				type={type} 
				style={style} 
				onChange={(e) => onChange(e)} 
			/>
		);
	}
}

Input.defaultProps = {
	type: 'text',
	placeholder: '',
	style: {},
	onChange: () => {},
	name: '',
	value: '',
	className: ''
};

Input.propTypes = {
	placeholder: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	style: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};

export default Input;