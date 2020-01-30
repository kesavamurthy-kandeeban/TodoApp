import React from 'react';
import TodoInput from './containers/TodoInput'
import Header from './components/Header'
import './App.css';
class App extends React.Component {

  render() {
    return (
      <div >
        <div className="Align-center">
          <Header />
        </div>
        <TodoInput />
      </div>);
  }
}

export default App;
