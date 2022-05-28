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
import { Bar } from 'react-chartjs-2';

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
  const isMobile = window.innerWidth < 830;
  const tabHeight = document.getElementsByClassName('react-tabs__tab-list')[0].clientHeight;
  const chartHeight = window.innerHeight - tabHeight - 190;
  const chartWidth = window.innerWidth - 60;
  
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
    responsive: isMobile ? false : true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    maintainAspectRatio: isMobile ? false : true
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
        backgroundColor: 'rgb(20,110,180)'
      }
    ]
  };

  return (
    <>
      {isMobile && (
        <>
          <Bar options={options} data={data} height={chartHeight} width={chartWidth} />
        </>
      )}
      {!isMobile && (
        <>
          <h1 className={styles.areaHead}>Spending By Year</h1>
          <Bar options={options} data={data} />
        </>
      )}
    </>
  );
}