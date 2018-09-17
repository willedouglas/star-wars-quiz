import React from 'react';
import PropTypes from 'prop-types';

import './Header.style.scss';

class Header extends React.Component {
	render() {
		const { children, score } = this.props;

		return (
			<div>
				<ul className="header">
					{
						children.map((child, idx) => <li key={idx}>{child}</li>)
					}
				</ul>
				<br />
				<span className="right">Pontos: {score}</span>
				<br />
			</div>
			
		);
	}
}

Header.defaultProps = {
	score: 0,
	children: []
};

Header.propTypes = {
	children: PropTypes.array,
	score: PropTypes.number
};

export default Header;