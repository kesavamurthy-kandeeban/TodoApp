import React from 'react'

import { Button } from 'antd'
import 'antd/dist/antd.css';

import './TodoList.css';
function showList(props) {
  return (
    props.MovieLists.Movies.list.map(data => {
      return (
        <tr key={data.id}>
          <td>{data.movieName}</td>
          <td>{data.releaseDate}</td>
          <td> <Button
            onClick={() => {
              props.viewMovie(data)
            }}
            size="default">
            View
            </Button>
          </td>
          <td>
            <Button
              onClick={props.removeMovie(data)}
              size="default">
              Edit
            </Button>
          </td>
          <td>
            <Button
              onClick={props.editMovie(data)}
              size="default">
              Remove
            </Button>
          </td>
        </tr>)
    })
  );
}

function MovieList(props) {

  return (
    <div> <table>
      <th>Movie Name</th>
      <th>Release Date</th>
      {showList(props)}
    </table>
    </div>
  )
}

export default MovieList