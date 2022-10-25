import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//aun q solo tenemos 1 hacerlo asi
const reducers = combineReducers({
	auth: authReducer,
	ui: uiReducer,
	notes: notesReducer,
});

//solo se le puede pasar como parametro un reducer para eso utilizamos el combineReducers
export const store = createStore(
	reducers,
	composeEnhancers(
		applyMiddleware(thunk)
	)
);