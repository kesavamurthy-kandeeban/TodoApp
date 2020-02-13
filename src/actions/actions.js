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

export const insertTodos = (payload) => {
  return async(dispatch) => {
    return (
      await api.post(`${apiRoute}`, payload, apiConfig)
      .then(res => {
        message.success(res.data.message)
        dispatch(updateTodos(res.data.list))
      })
      .catch(err => { console.log(err) }));
  }
}

export const getTodos = () => {
  return async(dispatch) => {
    return (
        await api.get(`${apiRoute}`, apiConfig)
        .then(res => {
          console.log(res)
          dispatch(updateTodos(res.data.list))
        })
        .catch(err => { 
          console.log(err) }));
  }
}

export const editTodos = payload => {
  return async(dispatch) => {
    return (
      await api.put(`${apiRoute}/${payload._id}`, payload, apiConfig)
      .then(res => {
        message.success(res.data.message)
        dispatch(updateTodos(res.data.list))
      })
      .catch(err => {
        console.log(err) }));
  }
}

export const deleteTodos = id => {
  return async(dispatch) => {
    return (
        await api.delete(`${apiRoute}/${id}`)
        .then(res => {
          message.success(res.data.message)
          dispatch(updateTodos(res.data.list))
        })
        .catch(err => {
          console.log(err) }));
  }
}