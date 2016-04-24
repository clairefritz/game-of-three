'use strict';

import io from 'socket.io-client';
import React from 'react';
import ReactDom from 'react-dom';
const socket = io();

class App extends React.Component {
  state = {
    numbers: []
  };

  // called on client only
  componentDidMount = () => {
    // listen to the socket events
    socket.emit('new user', Math.trunc(Math.random() * 1000));
    socket.on('new game', this._initialize);
    socket.on('move', this._update);
  };

  _initialize = (number) => {
    if (this.state.numbers.length === 0) {
      this.setState({
        numbers: [number]
      });
    }
  };

  _update = (number) => {
    let numbers = this.state.numbers;
    numbers.push(number);
    this.setState({numbers: numbers});
  };

  _invalidate = (amount) => {
    // TODO: implement some feedback to say that this operation is not possible
  };

  _add = (amount) => {
    let numbers = this.state.numbers;
    let lastNumber = numbers[numbers.length -1];
    let newNumber = lastNumber + amount;
    if (newNumber % 3 === 0) {
      socket.emit('move', newNumber / 3);
    } else {
      this._invalidate(amount);
    }
  };

  render() {
    return (
      <div>
        <h1>Game of three</h1>
        {this.state.numbers.map(function(n, key){
          return (<div key={key}>{n}</div>)
        })}
        <button onClick={this._add.bind(null, 1)}>+1</button>
        <button onClick={this._add.bind(null, 0)}>0</button>
        <button onClick={this._add.bind(null, -1)}>-1</button>
      </div>
    );
  }
}

ReactDom.render(<App/>, document.getElementById('app'));