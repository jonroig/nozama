import currency  from 'currency.js';
import date from 'date-and-time';
import { getStockPricePerDay } from '../../lib/getStockPricePerDay';

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

  
export default function Stock({orderArray, amznArray}) {

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


    let totalSpend = currency(0);
    let totalShares = 0;
    const purchaseStockArray = [];

    orderArray.forEach(orderObj => {
        if (!orderObj.OrderDate) {
            return;
        } 
        totalSpend = totalSpend.add(orderObj.ItemTotal);
        const stockPrice = getStockPricePerDay(orderObj.OrderDate, amznArray);
        const numShares = orderObj.ItemTotal.value / stockPrice;
        totalShares = totalShares + numShares;

        const tmpObj = {
            itemTotal: orderObj.ItemTotal,
            orderDate: orderObj.OrderDate,
            spendToDate: totalSpend,
            stockPrice,
            numShares,
            sharesToDate: totalShares
        };

        purchaseStockArray.push(tmpObj);
    });

    let currentStockPrice = currency(0);
    if (amznArray && amznArray.length > 0) {
        currentStockPrice = amznArray[amznArray.length -1].close;
    }

    const totalStockValue = currency(currentStockPrice * totalShares);
    const outputNumberOfShares = Math.round(totalShares * 100) / 100;


    const labels = purchaseStockArray.map(puchaseStockObj => date.format(puchaseStockObj.orderDate, 'YYYY-MM-DD'));
    const accumulatedShares= purchaseStockArray.map(puchaseStockObj => puchaseStockObj.sharesToDate);

    const data = {
        labels,
        datasets: [
          {
            data: accumulatedShares,
            backgroundColor: '#00b300',
            borderColor:  'rgb(0, 100, 0)',
            fill: true
          }
        ]
    };


    return (
        <div>
            <h1 className={styles.areaHead}>Stock</h1>
            
            <Line options={options} data={data} />
            <div>
                <p>
                    You spent {totalSpend.format()} total.
                </p>
                <p>
                    That would have purchased {outputNumberOfShares} shares.
                </p>
                <p>
                    Today that&apos;s worth {totalStockValue.format()}
                </p>
            </div>
        </div>
    );
}