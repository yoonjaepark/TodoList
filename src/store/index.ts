import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer, { RootState } from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const composedEnhancers = composeWithDevTools(compose(applyMiddleware(...middleware)));

const initialState: RootState = {} as RootState;
const store = createStore(rootReducer, initialState, composedEnhancers);

sagaMiddleware.run(rootSaga);

export default store;