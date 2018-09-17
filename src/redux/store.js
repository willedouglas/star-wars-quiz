import promiseMiddleware from 'redux-promise-middleware';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import rootReducer from './reducers/index';

const config = {
	key: 'root',
	storage
};

const reducer = persistReducer(config, rootReducer);

export const store = createStore(reducer, applyMiddleware(promiseMiddleware()));
export const configureStore = () => { const persistor = persistStore(store); return persistor; };