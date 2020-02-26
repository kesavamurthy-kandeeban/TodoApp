import { INSERT_TODOS, UPDATE_MOVIES, EDIT_TODO } from '../action-type/action-types';

import { message } from 'antd';

import axios from 'axios';

const apiRoute = '/todo';

const api = axios.create({
  baseURL: "http://localhost:4000",
});

const apiConfig = {
  header: {
    'Content-Type': 'application/json',
  }
};

export const updateTodos = (payload) => {
  return { type: INSERT_TODOS, payload };
};

export const updatemovies = (payload) => {
  return { type: UPDATE_MOVIES, payload };
};

export const editTodo = (todo) => {
  return { type:EDIT_TODO, todo }
}

/** Fat arrow function to handle multiple returns */
export const insertTodos = (payload) => async(dispatch) => {
  
  console.log((api.get(`${apiRoute}`, apiConfig)).data)
  
  const response = await api.post(`${apiRoute}`, payload, apiConfig);
  dispatch(updateTodos(response.data.list));
  message.success(response.data.message);
  return response.data.message
}

/** This is a bad practice. Await should not be follwed with .then.*/ 
export const getTodos = () => {
  return async(dispatch) => {
    return (
        await api.get(`${apiRoute}`, apiConfig)
        .then(response => {
          dispatch(updateTodos(response.data.list))
          return response.data.message
        })
        .catch(err => { 
          console.log(err) }));
  }
}

/* This is also a good practice*/
export const editTodos = payload => {
  return async(dispatch) => {
    const response = await api.put(`${apiRoute}/${payload._id}`, payload, apiConfig);
    message.success(response.data.message)
    return (dispatch(updateTodos(response.data.list)));
  }
}

export const deleteTodos = (id) => async(dispatch) => {
  const response = await api.delete(`${apiRoute}/${id}`);
  dispatch(updateTodos(response.data.list));
  message.success(response.data.message);
  return response.data.message;
}
