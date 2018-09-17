import React from 'react';
import PropTypes from 'prop-types';

import './Loading.style.scss';

class Loading extends React.Component {
	render() {
		const { style } = this.props;

		return (
			<div className={'loading-grid'} style={style}>
				<div className="loading loading1" />
				<div className="loading loading2" />
				<div className="loading loading3" />
				<div className="loading loading4" />
				<div className="loading loading5" />
				<div className="loading loading6" />
				<div className="loading loading7" />
				<div className="loading loading8" />
				<div className="loading tago-loading9" />
			</div>
		);
	}
}
Loading.defaultProps = {
	style: {
		width: 35,
		height: 35,
		position: 'inherit',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)'
	}
};

Loading.propTypes = {
	style: PropTypes.object.isRequired
};

export default Loading;