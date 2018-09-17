import React from 'react';
import PropTypes from 'prop-types';

import './Card.style.scss';

import defaultImg from '../../assets/imgs/NoImage.png';

class Card extends React.Component {
	render() {
		const { width, height, children, img } = this.props;

		return (
			<div className="card" style={{ width, height }}>
				<img src={img} alt="Avatar" style={{ width: width - 100, height: width - 100}} />
				<div className="card-container">
					{children}
				</div>
			</div>
		);
	}
}

Card.defaultProps = {
	width: 250,
	height: 250,
	children: [],
	img: defaultImg
};

Card.propTypes = {
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	children: PropTypes.array,
	img: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default Card;