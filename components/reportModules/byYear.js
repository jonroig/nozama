import currency  from 'currency.js';
import date from 'date-and-time';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import styles from '../../styles/Reports.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: false
        }
      }
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
          backgroundColor: [
              'rgba(255,153,0)',
              'rgba(20,110,180)',
              'rgba(0,0,0)',
              'rgba(35,47,62)'
          ]
        }
      ]
    };

    return (
        <>
          <h1 className={styles.areaHead}>Spending By Year</h1>
          <Bar options={options} data={data} />
        </>
    );
}