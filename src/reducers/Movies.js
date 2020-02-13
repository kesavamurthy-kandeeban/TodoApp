import { UPDATE_MOVIES } from '../action-type/action-types';

const InitialState = {
  list:[],
};

  const Movies = (state= InitialState, action) => {
  switch ( action.type ) {
  case UPDATE_MOVIES: return Object.assign({},state,{
      list: action.payload,
    });
    default: 
    return  state;
  }
}
export default Movies;
