import { createStore } from 'redux'
import CombineReducer from '../reducers/CombineReducer'

const store = createStore (CombineReducer);
export default store;