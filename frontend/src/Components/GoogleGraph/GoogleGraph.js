import React, { Component } from 'react';
import config from '../../Config/config.json';
import axios from 'axios';
import { Chart } from 'react-google-charts';

class GoogleGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        title: 'Electric Vehicles (EV) amount in New Zealand',
        hAxis: { title: 'Time' },
        vAxis: { title: 'Amount' },
        legend: 'none',
      },
      columns: [
        {
          type: 'date',
          label: 'Date Covered',
        },
        {
          type: 'number',
          label: 'Real Amount',
        }
      ],
      rows: [],
    };
  }

  prepareData(data) {
    let preparedData = [];
    for (let num in data) {
      let row = this.convertDictToArray(data[num]);
      let date_covered = row[1].split('.');

      preparedData.push([
        new Date(date_covered[2], date_covered[1], date_covered[0]),
        parseInt(row[2], 10)
      ]);
    }
    return preparedData;
  }

  convertDictToArray(dict) {
    let arr = [];
    for (let key in dict) {
      arr.push(dict[key]);
    }
    return arr;
  }

  async componentDidMount() {
    const res = await axios.get(config.api_url + '/get-all/')
    const all_data = this.prepareData(res.data);
    this.setState({ rows: all_data });
  }

  render() {
    return (
      <div className={'my-pretty-chart-container'}>
        <Chart
          chartType="LineChart"
          rows={this.state.rows}
          columns={this.state.columns}
          options={this.state.options}
          graph_id="LineChart"
          width="100%"
          height="400px"
          legend_toggle
        />
      </div>
    );
  }
}

export default GoogleGraph;
