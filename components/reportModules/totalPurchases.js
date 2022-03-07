import currency  from 'currency.js';
import styles from '../../styles/Reports.module.css';

export default function TotalPurchaes({orderArray}) {
    const totalObj = {
        totalNumberOfPurchases: 0,
        totalPurchase: currency(0),
        totalTax: currency(0)
    };

    orderArray.forEach(orderObj => {
        totalObj.totalNumberOfPurchases++;
        totalObj.totalPurchase = totalObj.totalPurchase.add(orderObj.ItemTotal);
        totalObj.totalTax = totalObj.totalTax.add(orderObj.ItemSubtotalTax);
    });

    return (
        <div className={styles.totalSpendContainer}>
            <h2 className={styles.totalSpendHeadline}>{totalObj.totalPurchase.format()}</h2>
            <h3 className={styles.totalSpendSubhead}>{new Intl.NumberFormat().format(totalObj.totalNumberOfPurchases)} items</h3>
            <h3 className={styles.totalSpendSubSubhead}>{totalObj.totalTax.format()} in taxes</h3>
        </div>
    );
}