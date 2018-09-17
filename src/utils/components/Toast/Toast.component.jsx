import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Toast.style.scss';

class Toast extends Component {
	componentDidMount() {
		const { onRemove, id } = this.props;

		setTimeout(() => onRemove(id), 3000);
	}

	render() {
		const { type, message, onRemove, id } = this.props;

		return (
			<li className={`toast ${type}`} onClick={() => onRemove(id)}>
				<p className="toast-content">{message}</p>
				<button className="toast-dismiss">×</button>
			</li>
		);
	}
}

Toast.propTypes = {
	onRemove: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
};

export default Toast;