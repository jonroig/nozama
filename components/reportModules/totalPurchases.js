import currency  from 'currency.js';
import styles from '../../styles/Reports.module.css';
import { getStockPricePerDay } from '../../lib/getStockPricePerDay';

export default function TotalPurchaes({orderArray, amznArray}) {
    const totalObj = {
        totalNumberOfPurchases: 0,
        totalPurchase: currency(0),
        totalTax: currency(0),
        totalShares: 0
    };

    orderArray.forEach(orderObj => {
        const stockPrice = getStockPricePerDay(orderObj.OrderDate, amznArray);
        const numShares = orderObj.ItemTotal.value / stockPrice;
        totalObj.totalShares = totalObj.totalShares + numShares;
        totalObj.totalNumberOfPurchases++;
        totalObj.totalPurchase = totalObj.totalPurchase.add(orderObj.ItemTotal);
        totalObj.totalTax = totalObj.totalTax.add(orderObj.ItemSubtotalTax);
    });

    let currentStockPrice = currency(0);
    if (amznArray && amznArray.length > 0) {
        currentStockPrice = amznArray[amznArray.length -1].close;
    }
    
    const totalStockValue = currency(currentStockPrice * totalObj.totalShares);

    return (
        <div className={styles.totalSpendContainer}>
            <h2 className={styles.totalSpendHeadline}>{totalObj.totalPurchase.format()}</h2>
            <h3 className={styles.totalSpendSubhead}>{new Intl.NumberFormat().format(totalObj.totalNumberOfPurchases)} items</h3>
            <h3 className={styles.totalSpendSubSubhead}>{totalObj.totalTax.format()} in taxes</h3>
            <h4>Could have bought...</h4>
            <h3 className={styles.totalSpendSubhead}>{new Intl.NumberFormat().format(totalObj.totalShares)} shares of AMZN</h3>
            <h2 className={styles.totalSpendSubhead}>worth {totalStockValue.format()}</h2>
        </div>
    );
}