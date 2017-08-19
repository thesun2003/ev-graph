import React, { Component } from 'react';
import config from '../../Config/config.json';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import everpolate from 'everpolate';
import extrapolate from 'extrapolate';

class GoogleGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        title: 'Electric & Hybrid Vehicles (EV/Hybrid) amount in New Zealand (with trend)',
        hAxis: { title: 'Time', maxValue: new Date() },
        vAxis: { title: 'Amount', maxValue: 5000 },
        legend: 'none',
        colors: ['#9575cd', '#33ac71'],
        pointShape: 'diamond',
        trendlines: {
          0: {
            type: 'polynomial',
            labelInLegend: 'Prediction',
            visibleInLegend: true,
            degree: 10,
            lineWidth: 10,
            opacity: 0.1,
          },
        },
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

  calculatePrediction(y_array) {
    const x_array = [...y_array.keys()]
    const predicted = everpolate.polynomial(54, x_array, y_array);

    let poly = new extrapolate();
    for (let num in y_array) {
      poly.given(num, y_array[num]);
    }
    const predicted2 = poly.getPoly(54);

    console.log(predicted, predicted2);
  }

  getOneColumnArray(data, column_num) {
    let column = [];
    for (let num in data) {
      column.push(data[num][column_num])
    }
    return column;
  }

  async componentDidMount() {
    const res = await axios.get(config.api_url + '/get-all/')
    const all_data = this.prepareData(res.data);

    // this.calculatePrediction(this.getOneColumnArray(all_data, 1));

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
