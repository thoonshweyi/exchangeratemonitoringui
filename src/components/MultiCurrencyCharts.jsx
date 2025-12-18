import React from "react";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons"


import api from "./../auth/api";

import { useSelector, useDispatch } from 'react-redux'

import { Chart } from "react-google-charts";

const options = (currency, type) => ({
	title: `${currency} Exchange Rate`,
	legend: { position: "bottom" },
	hAxis: {
		title: "Date",
		slantedText: true,
		slantedTextAngle: 60,
		showTextEvery: 1,
		textStyle: {
			fontSize: 10,
		}
	},
	vAxis: {
		title: `${type} Rate`,
		format: "###,###.00"
	},

	chartArea: {
		left: 60,
		top: 30,
		right: 20,
		bottom: 90
	},
	explorer: { axis: 'horizontal', keepInBounds: true }
});
export default function MultiCurrencyCharts() {

	const [loading, setLoading] = useState(true);
	const [chartData, setChartData] = useState({});
	const type = useSelector((state) => state.type.value);
	console.log(type);
	useEffect(() => {

		api.get(`exchangedocusweeklydashboard`)
			.then(res => {
				const data = res.data;
				console.log(data);

				setChartData(data);


				setLoading(false);
			})
			.catch(err => {
				console.error(`Error fetching exchange docus: ${err}`);
				setLoading(false);
			});
	}, []);

	// Not yet finish fetching
	if (loading) {
		return (
			<div className="text-center py-5">
				<FontAwesomeIcon icon={faSpinner} spin className="text-warning" />
				<p className="mt-2">Loading Page....</p>
			</div>
		)
	}

	return (
		<div key={type} className="row">
			{Object.entries(chartData).map(([currency, data]) => (
				<div key={currency} className="col-12 col-md-3 mb-4">
					<div style={{ width: "100%", height: "300px" }}>
						<Chart
							key={`${currency}-${type}`}
							chartType="LineChart"
							width="100%"
							height="100%"
							data={[...data[`${type}`]]}
							options={options(currency, type.toUpperCase())}
						/>
					</div>
				</div>
			))}
		</div>
	);
}

