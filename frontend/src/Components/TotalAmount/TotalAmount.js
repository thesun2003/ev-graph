import React, { Component } from 'react';
import config from '../../Config/config.json';
import axios from 'axios';

class TotalAmount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actual_number: 0
    };
  }

  async componentDidMount() {
    const res = await axios.get(config.api_url + '/get-actual/')
    const number = parseInt(res.data.real_amount, 10);
    this.setState({ actual_number: number });
  }   

  render() {
    return <h1>{this.state.actual_number}</h1>;
  }
}

export default TotalAmount;
