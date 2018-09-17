import axios from 'axios';
import instance from '../../config/axios';

function startGame() {
	return {
		type: 'START'
	};
}

function endGame() {
	return {
		type: 'END'
	};
}

function getPeoples(page) {
	return {
		type: 'GETPEOPLES',
		payload: axios.get(`https://swapi.co/api/people/?page=${page}`)
	};
}

function getImages(term) {
	return {
		type: 'GETIMAGES',
		payload: instance.get(`?q=${term}`),
		meta: term
	};
}

function getPlanet(planet, people) {
	return {
		type: 'GETPLANET',
		payload: axios.get(`https://swapi.co/api/planets/${planet}`),
		meta: { planet, people }
	};
}

function getSpecie(specie, people) {
	return {
		type: 'GETSPECIE',
		payload: axios.get(`https://swapi.co/api/species/${specie}`),
		meta: { specie, people }
	};
}

function getMovie(movie, people) {
	return {
		type: 'GETMOVIE',
		payload: axios.get(`https://swapi.co/api/films/${movie}`),
		meta: { movie, people }
	};
}

function getVehicle(vehicle, people) {
	return {
		type: 'GETVEHICLE',
		payload: axios.get(`https://swapi.co/api/vehicles/${vehicle}`),
		meta: { vehicle, people }
	};
}

function highscore(data) { 	
	return {
		type: 'HIGHSCORE',
		payload:  new Promise((resolve) => { resolve({ data }); })
	};
}

export {
	startGame,
	endGame,
	getPeoples,
	getImages,
	getPlanet,
	getSpecie,
	getMovie,
	getVehicle,
	highscore
};