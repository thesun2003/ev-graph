import React, { Component } from 'react';
import config from './config.json';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class TotalAmount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actual_number: 0
    };
  }

  componentDidMount() {
    axios.get(config.api_url + '/get-actual/')
    .then(res => {
      const actual_number = parseInt(res.data.real_amount);
      this.setState({ actual_number });
    });
  }

  render() {
    return <h1>{this.state.actual_number}</h1>;
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <TotalAmount />
        </div>
        <p className="App-intro">
          Electric vehicles registered in NZ.
        </p>
      </div>
    );
  }
}

export default App;
