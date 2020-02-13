import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import CombineReducer from '../reducers/CombineReducer';

const store = createStore(CombineReducer,
  composeWithDevTools(
    applyMiddleware(thunk)));

export default store;
