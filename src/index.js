import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Loading, Toasts } from './utils/components/index.js';
import { configureStore, store } from './redux/store';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';

import './assets/scss/main.scss';

import Intro from './pages/Intro/Intro.jsx';
import Game from './pages/Game/Game.jsx';

const startRoutes = () => {
	const persistor = configureStore();
	const root = document.getElementById('root');

	ReactDOM.render(
		<Provider store={store}>
			<PersistGate
				loading={<Loading />}
				persistor={persistor}>
				<Toasts />
				<HashRouter>
					<Switch>
						<Route
							exact
							path="/"
							component={(props) => <Intro { ...props } />}
						/>
						<Route
							exact
							path="/game"
							component={(props) => <Game { ...props } />}
						/>
					</Switch>
				</HashRouter>
			</PersistGate>
		</Provider>, 
		root
	);
};

startRoutes();