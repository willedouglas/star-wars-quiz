export default function game(state = { peoples: [], highscores: [], isPending: true }, action) {
	switch (action.type) {
	case 'GETPEOPLES_FULFILLED': {
		return Object.assign({}, state, { peoples: action.payload.data.results, isPending: false });
	}

	case 'GETPEOPLES_PENDING': {
		return Object.assign({}, state, { isPending: true });
	}

	case 'GETPEOPLES_REJECTED': {
		return Object.assign({}, state, { isPending: false });
	}

	case 'GETIMAGES_FULFILLED': {
		const image = action.payload.data.value[0].contentUrl;

		const peopleUpdated = state.peoples.map((people) => {
			if (people.name === action.meta) {
				return Object.assign(people, { image });
			}

			return people;
		});

		return Object.assign({}, state, { peoples: peopleUpdated, isPendingImage: false });
	}

	case 'GETIMAGES_PENDING': {
		return Object.assign({}, state, { isPendingImage: true });
	}

	case 'GETIMAGES_REJECTED': {
		return Object.assign({}, state, { isPendingImage: false });
	}

	case 'GETPLANET_FULFILLED': {
		const planetName = action.payload.data.name;

		const peopleUpdated = state.peoples.map((people) => {
			if (people.name === action.meta.people.name) {
				return Object.assign(people, { planet: planetName });
			}

			return people;
		});

		return Object.assign({}, state, { peoples: peopleUpdated, isPendingPlanet: false });
	}

	case 'GETPLANET_PENDING': {
		return Object.assign({}, state, { isPendingPlanet: true });
	}

	case 'GETPLANET_REJECTED': {
		return Object.assign({}, state, { isPendingPlanet: false });
	}

	case 'GETSPECIE_FULFILLED': {
		const specieName = action.payload.data.name;

		const peopleUpdated = state.peoples.map((people) => {
			if (people.name === action.meta.people.name) {
				const species = [];
				species.push(specieName);

				return Object.assign(people, { genus: species });
			}

			return people;
		});

		return Object.assign({}, state, { peoples: peopleUpdated, isPendingSpecie: false });
	}

	case 'GETSPECIE_PENDING': {
		return Object.assign({}, state, { isPendingSpecie: true });
	}

	case 'GETSPECIE_REJECTED': {
		return Object.assign({}, state, { isPendingSpecie: false });
	}

	case 'GETMOVIE_FULFILLED': {
		const movieName = action.payload.data.title;

		const peopleUpdated = state.peoples.map((people) => {
			if (people.name === action.meta.people.name) {
				if (people.movies) {
					people.movies.push(movieName);

					return people;	
				}
				
				const movies = [];
				movies.push(movieName);

				return Object.assign(people, { movies });
			}

			return people;
		});

		return Object.assign({}, state, { peoples: peopleUpdated, isPendingMovie: false });
	}

	case 'GETMOVIE_PENDING': {
		return Object.assign({}, state, { isPendingMovie: true });
	}

	case 'GETMOVIE_REJECTED': {
		return Object.assign({}, state, { isPendingMovie: false });
	}

	case 'GETVEHICLE_FULFILLED': {
		const vehicleName = action.payload.data.name;

		const peopleUpdated = state.peoples.map((people) => {
			if (people.name === action.meta.people.name) {
				if (people.cars) {
					people.cars.push(vehicleName);

					return people;	
				}
				
				const cars = [];
				cars.push(vehicleName);

				return Object.assign(people, { cars });
			}

			return people;
		});

		return Object.assign({}, state, { peoples: peopleUpdated, isPendingVehicle: false });
	}

	case 'GETVEHICLE_PENDING': {
		return Object.assign({}, state, { isPendingVehicle: true });
	}

	case 'GETVEHICLE_REJECTED': {
		return Object.assign({}, state, { isPendingVehicle: false });
	}

	case 'HIGHSCORE_FULFILLED': {
		const { data } = action.payload;
		return Object.assign({}, state, { highscores: [ ...state.highscores, data ], isPendingHighscore: false });
	}

	case 'HIGHSCORE_PENDING': {
		return Object.assign({}, state, { isPendingHighscore: true });
	}

	case 'HIGHSCORE_REJECTED': {
		return Object.assign({}, state, { isPendingHighscore: false });
	}


  
	case 'START': {
		return Object.assign({}, state, { isPending: true });
	}

	case 'END': {
		return Object.assign({}, state, { });
	}

	default: {
		return state;
	}
	}
}