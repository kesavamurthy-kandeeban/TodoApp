import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import './App.css';
import { Button } from 'antd';

import TodoInput from './containers/TodoInput';
import Movies from './containers/Movies';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      viewForm: true
    };
  }

  showPage() {
    return (
      <div><Link to='/todo'><Button type="primary">Todo</Button></Link>
        <Link to='/movies'><Button >Movies</Button></Link>
      </div>);
  }
  render() {
    return (
      <div className="AlignCenter" >
        <h2 className="AlignCenter">Choose the action to perform</h2>
        <BrowserRouter>
          {(this.state.viewForm) && this.showPage()}
          <Switch>
            <Route path='/todo' component={ TodoInput } />
            <Route path='/movies' component={ Movies } />
          </Switch>
        </BrowserRouter>
      </div>);
  }
}

export default App;
