import currency  from 'currency.js';
import date from 'date-and-time';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);



export default function ByYear({orderArray}) {
    const yearObj = {};
    orderArray.forEach(orderObj => {
        if (orderObj.OrderDate) {
            const orderYear = date.format(orderObj.OrderDate, 'YYYY');
            if (!yearObj[orderYear]) {
                yearObj[orderYear] = {
                    total: currency(0), 
                    records: []
                };
            }
            yearObj[orderYear].records.push(orderObj.OrderID);
            yearObj[orderYear].total = yearObj[orderYear].total.add(orderObj.ItemTotal);
        }
    });

    const options = {
      responsive: true,
      backgroundColor: 'rgb(20,110,180)',
      borderColor:  'rgb(20,110,180)',
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: false
        }
      },
      fill: true
    };
      
    const labels = Object.keys(yearObj);
    const spendingTotals = labels.map(year => (
      yearObj[year].total.value
    ));

    const data = {
      labels,
      datasets: [
        {
          data: spendingTotals,
          backgroundColor: 'rgb(20,110,180)',
          borderColor:  'rgb(20,110,180)',
          fill: true
        }
      ]
    };

    return (
        <>
          <h1 className={styles.areaHead}>Spending By Year</h1>
          <Line options={options} data={data} />
        </>
    );
}