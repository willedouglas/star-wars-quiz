import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Button } from '../../components/index';

import './Intro.scss';

import darthVaderImg from '../../assets/imgs/DarthVader.png';

class Intro extends Component {

	startGame() {
		return this.context.router.history.push('/game');	
	}

	render() {
		return (
			<Container width={'80%'}>
				<h1>
					Star Wars Quiz Game
				</h1>
				<img className="intro-img" src={darthVaderImg} alt="Darth Vader" />
				<div className="form-content">
					<div className="description">
						<p>Você terá dois minutos para acertar o nome do maior número de personagens que você conseguir.</p>
						<p>Para cada acerto sem consultar os detalhes, você ganha dez pontos, caso contrário, apenas cinco.</p>
						<p>É permitido errar quantas vezes quiser, que não afeta a sua pontuação.</p>
						<p>Não é permitido responder mais de uma vez o mesmo personagem.</p>
						<p><strong>Boa sorte e que a força esteja com você!</strong></p>
					</div>
					<Button width={'15%'} onClick={this.startGame.bind(this)}>Jogar!</Button>
				</div>
			</Container>
		);
	}
}

Intro.contextTypes = {
	router: PropTypes.object,
};

export default connect(state => (state))(Intro);