import React, { Component } from 'react';
import TotalAmount from '../Components/TotalAmount/TotalAmount'
import GoogleGraph from '../Components/GoogleGraph/GoogleGraph'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <TotalAmount />
        </div>
        <p className="App-intro">
          Electric vehicles registered in NZ
        </p>
        <GoogleGraph />
      </div>
    );
  }
}

export default App;
