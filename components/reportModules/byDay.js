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
  const isMobile = window.innerWidth < 400;
  const tabHeight = document.getElementsByClassName('react-tabs__tab-list')[0].clientHeight;
  const chartHeight = window.innerHeight - tabHeight - (isMobile ? 190 : 300);

  const options = {
    responsive: isMobile ? false : true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    barThickness: 3,
    maintainAspectRatio: isMobile ? false : true
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
        backgroundColor: 'rgba(20,110,180)'
      }
    ]
  };

  return (
    <>
      {isMobile && (
        <>
          <Bar options={options} data={data} height={chartHeight} />
        </>
      )}
      {!isMobile && (
        <>
          <h1 className={styles.areaHead}>Spending By Day</h1>
          <Bar options={options} data={data} />
        </>
      )}
    </>
  );
}