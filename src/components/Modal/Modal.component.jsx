import React from 'react';
import PropTypes from 'prop-types';

import './Modal.style.scss';

class Modal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			display: false,
			params: null,
		};
	}

	show(params) {
		const display = true;
		this.setState({ display, params });
	}

	close() {
		const { onClose } = this.props;
		const display = false;
		this.setState({ display });

		if (onClose) {
			onClose();
		}
	}

	render() {
		const { display } = this.state;
		const { children, width, maxWidth, showClose } = this.props;

		return (
			<div className="modal" style={{ display: display ? 'block' : 'none' }}>
				<div className="modal-content" style={{ width, maxWidth }}>
					{showClose ?
						<div>
							<span className="close" onClick={() => this.close()}>&times;</span>
						</div> : ''
					}	
					{children}
				</div>
			</div>
		);
	}
}

Modal.defaultProps = {
	onClose: () => {},
	width: '65%',
	showClose: true
};

Modal.propTypes = {
	children: PropTypes.any,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onClose: PropTypes.func,
	showClose: PropTypes.bool
};

export default Modal;