import currency  from 'currency.js';
import date from 'date-and-time';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};


export default function AccumulationByDay({orderArray}) {
    const dayObj = {};
    const labels = [];
    let totalAccumulatedSpend = currency(0);
    orderArray.forEach(orderObj => {
        if (orderObj.OrderDate) {
            const orderDay = date.format(orderObj.OrderDate, 'YYYY-MM-DD');
            if (!dayObj[orderDay]) {
                dayObj[orderDay] = {
                    totalAccumulatedSpend: currency(0)
                };
                labels.push(orderDay);
            }
            totalAccumulatedSpend = totalAccumulatedSpend.add(orderObj.ItemTotal);
            dayObj[orderDay].totalAccumulatedSpend = totalAccumulatedSpend;
        }
    });

    const dayData = Object.keys(dayObj).map(day => (
        dayObj[day].totalAccumulatedSpend.value
    ));

    const data = {
        labels,
        datasets: [
            {
            data: dayData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (
        <Line options={options} data={data} />
    );
}