import { INSERT_TODOS, EDIT_TODO } from '../action-type/action-types';

const initialState = {
  
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
  case INSERT_TODOS:
      return Object.assign({}, state, {
        todoList: action.payload,
      }); 
  case EDIT_TODO:
      return Object.assign({}, state, {
        editTodo: action.todo,
      });        
  default: 
  return state;
  }
}
export default reducer;
