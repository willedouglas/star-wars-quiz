import React from 'react';
import PropTypes from 'prop-types';

import './Container.style.scss';

class Container extends React.Component {
	render() {
		const { width, children } = this.props;

		return (
			<div className="container">
				<div className="box" style={{ width: width }}>
					{children}
				</div>
			</div>
		);
	}
}

Container.propTypes = {
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	children: PropTypes.any.isRequired
};

export default Container;