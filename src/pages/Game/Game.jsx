import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validateForm from './validate-form';
import actions from '../../redux/actions/index';
import { isMobile } from '../../utils/functions/index';
import { Loading } from '../../utils/components/index';
import { Container, Header, Timer, Card, Button, Modal, Input } from '../../components/index';

import './Game.scss';

import darthVaderImg from '../../assets/imgs/DarthVader.png';

const defaultWidthModals = isMobile() ? '85%' : '40%';

const initialState = {
	data: { inputTry: '', inputName: '', inputEmail: '' },
	selected: { genus: [], cars: [], movies: [] },
	game: { try: [], tip: [] },
	validationError: {},
	points: 0,
	page: 1,
	time: 120
};

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = initialState;
	}

	componentDidMount() {
		const { page } = this.state;

		const hasPeoples = this.props.game.peoples.length > 0;

		if (!hasPeoples) {
			this.getPeoples(page);
		}
	}

	save() {
		const { dispatch } = this.props;
		const { data, points } = this.state;

		const highscore = Object.assign({}, {
			email: data.inputEmail,
			name: data.inputName,
			points: points
		});

		const containError = this.validate(true);
    
		if (containError) {
			return;
		}

		this.setState({ data: { inputTry: '', inputName: '', inputEmail: '' }});

		this.modalScore.close();
		this.modalHighscore.show();

		dispatch(actions.highscore(highscore));	
	}

	validate(isScore) {
		const { data } = this.state;
		const { dispatch } = this.props;
 
		const validationError = validateForm(data, isScore);
		const existValidationError =
      Object.keys(validationError).filter((key) => validationError[key]).length > 0;

		this.setState({ validationError });

		if (existValidationError) {
			dispatch(actions.addToast('error', 'Informe os campos obrigatórios.'));
			return true;
		}

		return false;
	}

	newGame() {
		this.setState(initialState);
		this.modalTry.close();
		this.modalDetails.close();
		this.modalScore.close();
		this.modalHighscore.close();
		this.timer.renew(this.state.time);
	}

	getPeoples(page) {
		const { dispatch } = this.props;

		dispatch(actions.getPeoples(page)).then(() => {
			this.props.game.peoples.forEach(people => dispatch(actions.getImages(people.name)));
		});
	}
  
	getDetails(people) {
		const { dispatch } = this.props;

		const getIds = (terms) => {
			if (typeof terms === 'object') {
				return terms.map((term) => term.split('/')[5]);
			}

			return terms.split('/')[5];
		};

		const ids = {
			planet: getIds(people.homeworld),
			specie: getIds(people.species),
			movie: getIds(people.films),
			vehicle: getIds(people.vehicles),
		};

		Object.keys(ids).forEach(id => {
			if (typeof ids[id] === 'object') {
				ids[id].forEach(d => {
					if (id === 'specie') {
						return dispatch(actions.getSpecie(d, people));
					}
					if (id === 'movie') {
						return dispatch(actions.getMovie(d, people));
					}
					if (id === 'vehicle') {
						return dispatch(actions.getVehicle(d, people)); 
					}
				});
			}

			return dispatch(actions.getPlanet(ids.planet, people));
		});
    
		this.modalDetails.show();
	}

	change(key, value) {
		this.setState({ data: { ...this.state.data, [key]: value } });
	}

	checkAnswer() {
		const { dispatch } = this.props;
		const { selected, data, game, points } = this.state;
		const answerPoints = this.calcPoints();

		const containError = this.validate(false);
		const answer = data.inputTry;
    
		if (containError) {
			return;
		}

		const isCorrectAnswer = selected.name.toLowerCase() === answer.toLowerCase();
		const type = isCorrectAnswer ? 'success' : 'error';
		const message = isCorrectAnswer ? `Parabéns você acertou! Ganhou ${answerPoints} pontos.` : 'Você errou, tente com outro personagem.';

		this.setState(
			{ 
				points: isCorrectAnswer ? points + answerPoints : points,
				game: { ...game, try: [...game.try, selected.name], tip: [...game.tip] },
			}
		);
    
		this.modalTry.close();
		return dispatch(actions.addToast(type, message));
	}

	setGameRules(isDetails, people) {	
		const { game } = this.state;

		if (isDetails) {
			return this.setState(
				{ 
					game: { ...game, try: [...game.try], tip: [...game.tip, people.name] },
					selected: Object.assign(people, { cars: [], genus: [], movies: [] }),
					data: { inputTry: '', inputName: '', inputEmail: '' }
				},
				() => this.getDetails(people));
		}

		return this.setState(
			{
				selected: Object.assign(people, { cars: [], genus: [], movies: [] }),
				data: { inputTry: '', inputName: '', inputEmail: '' }
			},
			() => this.modalTry.show());
	}

	calcPoints() {
		const { selected, game } = this.state;

		const FULL_POINTS = 10;
		const HALF_POINTS = 5;

		const isHalf = game.tip.filter(t => t === selected.name).length > 0;

		return isHalf ? HALF_POINTS : FULL_POINTS;
	}

	paginate(isNext) {
		const { page } = this.state;

		const updatedPage = isNext ? page + 1 : (page - 1 <= 1 ? 1 : page -1);

		this.setState({ page: updatedPage }, () => this.getPeoples(updatedPage));
	}

	compare(a,b) {
		if (a.points > b.points)
			return -1;
		if (a.points < b.points)
			return 1;
		return 0;
	}

	renderModalDetails() {
		const { selected } = this.state;
		const { isPendingPlanet, isPendingMovie, isPendingVehicle, isPendingSpecie } = this.props.game;

		const isPending = isPendingPlanet || isPendingMovie || isPendingVehicle || isPendingSpecie;

		const imgStyle = { 
			width: '55%', 
			height: 200, 
			borderRadius: 5
		};

		const alert = (
			<Modal width={defaultWidthModals} maxWidth={550} ref={(el) => { this.modalDetails = el; }}>
				<div className="modal-game">
					<img src={selected.image} alt="Avatar" style={imgStyle} />
					<div className="people-description">
						<span>
							<strong>Altura:</strong> <p>{selected.height}</p>
						</span>
						<span>
							<strong>Cabelo:</strong> <p>{selected.hair_color}</p>
						</span>
						<span>
							<strong>Planeta:</strong> <p>{selected.planet}</p>
						</span>
					</div>
				</div>
				{isPending ? 
					<div className="modal-game loading center">
						<Loading style={{ width: 35, height: 35, margin: 50 }}/>
					</div>
					:
					<div className="container-description">
						<div className="people-itens">
							{ selected.genus.length > 0 ?
								(<div>
									<strong>Espécie:</strong> 
									<p>{selected.genus.join(', ')}</p>
								</div>) : ''
							}
							{ selected.cars.length > 0 ?
								(<div>
									<strong>Veículos:</strong>
									<p>{selected.cars.join(', ')}</p>
								</div>) : ''	
							}
							{ selected.movies.length > 0 ?
								(<div>
									<strong>Filmes:</strong> 
									<p>{selected.movies.join(', ')}</p>
								</div>) : ''
							}
						</div>
					</div>
				}
				<div className="center">
					<Button width={isMobile() ? '95%' : '40%'} onClick={() => this.modalDetails.close()}>Fechar</Button>	
				</div>
			</Modal>
		);

		return alert;
	}

	renderModalTry() {
		const { data, validationError } = this.state;

		const alert = (
			<Modal width={defaultWidthModals} maxWidth={550} ref={(el) => { this.modalTry = el; }}>
				<div className="modal-try">
					<h1 className="ellipsis">Você sabe o nome do personagem?</h1>
					<div className="score-info between">
						<p>Tente a sorte, você não será punido, eu prometo.</p>
						<p className="points"><strong>Valendo: </strong> {this.calcPoints()} pontos.</p>					
					</div>
					<div className="center">
						<Input 
							className={validationError.inputTry ? 'required' : ''} 
							style={{ width: '55%', height: 50, margin: 10 }} 
							value={data.inputTry} 
							onChange={(e) => this.change('inputTry', e.target.value)}
						>
						</Input>
						<Button width={'40%'} height={50} onClick={() => this.checkAnswer()}>
							Tentar
						</Button>
					</div>
				</div>
			</Modal>
		);

		return alert;
	}

	renderModalScore() {
		const { points, data, validationError } = this.state;

		const alert = (
			<Modal width={defaultWidthModals} maxWidth={550} ref={(el) => { this.modalScore = el; }} showClose={false}>
				<div className="modal-score">
					<h1 className="ellipsis">Quiz Finalizado!</h1>
					<div className="score-info">
						<h1 className="ellipsis">{points}</h1>
						<p>&nbsp; pontos!</p>
					</div>
					<div style={{ marginLeft: isMobile() ? 0 : 30 }}>
						<p>Preencha o formulário abaixo para salvar sua pontuação.</p>
					</div>
					<div className="score-inputs" style={{ marginLeft: isMobile() ? 0 : 30 }}>
						<div>
							Nome: 
							<Input 
								className={validationError.inputName ? 'required' : ''} 
								style={{ width: '80%', height: 25, margin: 10 }} 
								value={data.inputName} 
								onChange={(e) => this.change('inputName', e.target.value)}
							/>
						</div>
						<div>
							E-mail: 
							<Input 
								className={validationError.inputEmail ? 'required' : ''} 
								style={{ width: '80%', height: 25, margin: 10 }} 
								value={data.inputEmail} 
								onChange={(e) => this.change('inputEmail', e.target.value)}
							/>
						</div>
					</div>
					<div className="score-buttons">
						<Button width={isMobile() ? '95%' : '40%'} onClick={() => this.save()}>
							Salvar
						</Button>
						<Button width={isMobile() ? '95%' : '40%'} onClick={() => this.newGame()}>
							Novo Jogo
						</Button>
					</div>
				</div>
			</Modal>
		);

		return alert;
	}

	renderModalHighscores() {
		const { highscores } = this.props.game;

		const sortedArray = highscores.sort(this.compare);

		const alert = (
			<Modal width={defaultWidthModals} maxWidth={550} ref={(el) => { this.modalHighscore = el; }} showClose={false}>
				<div className="modal-highscore">
					<h1 className="ellipsis">Highscores</h1>
					<div className="highscore-item">
						<p><strong>Nome</strong></p>
						<p><strong>Pontuação</strong></p>
					</div>
					{
						sortedArray.map((highscore, idx) => {
							if (idx < 5) {
								return (
									<div className="highscore-item" key={idx}>
										<p>{highscore.name}</p>
										<p><strong>{highscore.points}</strong></p>
									</div>
								);
							}
						})
					}
					<div className="center">
						<Button width={isMobile() ? '95%' : '40%'} onClick={() => this.newGame()}>
							Novo Jogo
						</Button>
					</div>
				</div>
			</Modal>
		);

		return alert;
	}

	renderPeoples(peoples) {
		const { game } = this.state;

		return (
			peoples.map((people) => {
				const isDisabled = game.try.filter(t => t === people.name).length > 0;
				return (
					<Card key={people.name} img={people.image}>
						<Button onClick={() => this.setGameRules(false, people)} width={'40%'} disabled={isDisabled}>
							?
						</Button>
						<Button onClick={() => this.setGameRules(true, people)} width={'40%'}>
							...
						</Button>
					</Card>
				);
			})
		);
	}

	render() {
		const { game } = this.props;
		const { points, time } = this.state;
		const { peoples, isPending } = game;

		const hasPeoples = peoples.length > 0;

		const onFinish = () => this.modalScore.show();

		return (
			<Container width={'80%'}>
				{this.renderModalDetails()}
				{this.renderModalTry()}
				{this.renderModalScore()}
				{this.renderModalHighscores()}
				<Header score={points}>
					<img className="game-img" src={darthVaderImg} alt="Darth Vader" />
					<h1>Star Wars Quiz Game</h1>
					<Timer time={time} onFinish={onFinish} ref={(el) => { this.timer = el; }} />
				</Header>
				<br />
				<div className="cards-container">
					{isPending && !hasPeoples ? <Loading /> : this.renderPeoples(peoples)}
				</div>
				<div className="cards-container">
					<Button width={isMobile() ? '85%' : '15%'} onClick={() => this.paginate(false)}>
						Anterior
					</Button>
					<Button width={isMobile() ? '85%' : '15%'} onClick={() => this.paginate(true)}>
						Próximo
					</Button>
				</div>
			</Container>
		);
	}
}

Game.contextTypes = {
	router: PropTypes.object,
};

export default connect(state => (state))(Game);