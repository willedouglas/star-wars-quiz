import React from 'react';
import PropTypes from 'prop-types';

import './Button.style.scss';

class Button extends React.Component {
	render() {
		const { width, height, color, disabled, onClick, children } = this.props;

		const customStyle = {
			backgroundColor: !disabled ? color : 'grey', 
			width,
			height
		};
	
		return (
			<button className="button ellipsis" onClick={onClick} style={customStyle} disabled={disabled}>
				{children}
			</button>
		);
	}
}

Button.defaultProps = {
	width: 50,
	color: 'black',
	disabled: false,
	onClick: () => {},
	children: 'Default Button'
};

Button.propTypes = {
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	color: PropTypes.string.isRequired,
	disabled: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
	children: PropTypes.string.isRequired
};

export default Button;