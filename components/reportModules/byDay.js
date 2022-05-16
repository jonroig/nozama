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


export default function ByDay({orderArray}) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Spending By Day',
      }
    }
  };

        
  const dayObj = {};
  orderArray.forEach(orderObj => {
    if (orderObj.OrderDate) {
      const orderDay = date.format(orderObj.OrderDate, 'YYYY-MM-DD');
      if (!dayObj[orderDay]) {
        dayObj[orderDay] = {
          total: currency(0), 
          records: []
        };
      }
      dayObj[orderDay].records.push(orderObj.OrderID);
      dayObj[orderDay].total = dayObj[orderDay].total.add(orderObj.ItemTotal);
    }
  });

  const labels = Object.keys(dayObj);
  const spendingAmounts = labels.map(year => (
    dayObj[year].total.value
  ));

  const data = {
    labels,
    datasets: [
      {
        data: spendingAmounts,
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
      <h1 className={styles.areaHead}>Spending By Day</h1>
      <Bar options={options} data={data} />
    </>
  );
}