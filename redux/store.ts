import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import * as reducers from './reducers';
import rootSaga from './sagas';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import logger from 'redux-logger';

const AppStore = (initialState = {}) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [logger, thunk, sagaMiddleware];

    const store = createStore(
        combineReducers({
            ...reducers,
        }),
        composeWithDevTools(applyMiddleware(...middlewares)),
    );
    sagaMiddleware.run(rootSaga);

    return store;
};

export default AppStore;
