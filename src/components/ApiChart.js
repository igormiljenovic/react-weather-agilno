import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class ApiChart extends Component {

	// Set up states for loading data
	constructor(props){
		super(props);
		this.state ={ data: [] }
	}



	// Call API upon component mount
	componentDidMount() {

		const endpoint = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m";

		fetch(endpoint)
			.then(response => response.json())
			.then(data => {
				this.setState( {data: data} )
        console.log(data);
			})

}
	// Change data structure
	transformData (data) {

    let dataHourly = data.hourly;

    console.log(data.hourly);
    console.log(Object.keys(data));
		let plot_data = [];

		let dataHourlyArray = [dataHourly];

    console.log(dataHourly);
    console.log(dataHourlyArray);



    // can't read time

  //  dataHourlyArray.map(key => {
  //        x.push(key.time);
  //    })

  // x and y undefined when pushing arrays from json

		plot_data['x'] = dataHourlyArray['time'];
		plot_data['y'] = dataHourlyArray['temperature_2m'];

		console.log(plot_data)

		return plot_data
	}

	render() {
		return (
			<div>
				<Plot
					data = {[
							{type: 'scatter',
							 mode: 'lines',
							 x: this.transformData(this.state.data)['x'],
							 y: this.transformData(this.state.data)['y'],
							 marker: { color: '#ed022d'}}
						]}
					layout = { {width: 1000, height: 500, title: 'Forecast'} }
				 />
			</div>
		)
	}
}

export default ApiChart;
