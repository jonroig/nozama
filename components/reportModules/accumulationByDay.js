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
    Filler
  } from 'chart.js';

import { Line } from 'react-chartjs-2';

import styles from '../../styles/Reports.module.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: false,
        }
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
                backgroundColor: 'rgb(20,110,180)',
                borderColor:  'rgb(20,110,180)',
                fill: true
            }
        ],
    };

    return (
        <>
            <h1 className={styles.areaHead}>Spending Over Time</h1>
            <Line options={options} data={data} />
        </>
        
    );
}