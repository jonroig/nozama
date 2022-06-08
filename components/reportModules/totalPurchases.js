import currency  from 'currency.js';
import styles from '../../styles/Reports.module.css';
// import { getStockPricePerDay } from '../../lib/getStockPricePerDay';
import RecordItem from "./recordItem";

export default function TotalPurchases({orderArray, amznArray}) {
    console.log('orderArray', orderArray);
    const totalObj = {
        totalNumberOfPurchases: 0,
        totalPurchase: currency(0),
        totalTax: currency(0),
        totalShares: 0,
        orderIdArray: [],
        shippingAddressArray: []
    };


    orderArray.forEach(orderObj => {
        if (!orderObj.OrderDate) {
            return;
        } 
        // const stockPrice = getStockPricePerDay(orderObj.OrderDate, amznArray);
        // const numShares = orderObj.ItemTotal.value / stockPrice;
        // totalObj.totalShares = totalObj.totalShares + numShares;
        totalObj.totalNumberOfPurchases++;
        totalObj.totalPurchase = totalObj.totalPurchase.add(orderObj.ItemTotal);
        totalObj.totalTax = totalObj.totalTax.add(orderObj.ItemSubtotalTax);
        if (!totalObj.orderIdArray.includes(orderObj.OrderID)) {
            totalObj.orderIdArray.push(orderObj.OrderID);
        }
        const shippingAddress = `${orderObj.ShippingAddressStreet1}-${orderObj.ShippingAddressStreet2}-${orderObj.ShippingAddressCity}-${orderObj.ShippingAddressState}-${orderObj.ShippingAddressZip}`;
        if (!totalObj.shippingAddressArray.includes(shippingAddress)) {
            totalObj.shippingAddressArray.push(shippingAddress);
        }
    });
    const averageOrder = currency(totalObj.totalPurchase.value  / totalObj.orderIdArray.length);
    // let currentStockPrice = currency(0);
    // if (amznArray && amznArray.length > 0) {
    //     currentStockPrice = amznArray[amznArray.length -1].close;
    // }
    
    // const totalStockValue = currency(currentStockPrice * totalObj.totalShares);

    const sortedByExpense = orderArray.filter(orderObj => (
        orderObj.ItemTotal.value > 0 
    )).sort((a,b) => (
        b.ItemTotal.value - a.ItemTotal.value
    ));

    const mostExpensiveObj = sortedByExpense.length > 0 ? sortedByExpense[0] : null;
    const leastExpensiveObj = sortedByExpense.length > 0 ? sortedByExpense[sortedByExpense.length -1] : null;
    return (
        <div className={styles.mobileGraphContainer}>
            <div className={styles.totalSpendContainer}>
                <h2 className={styles.totalSpendHeadline}>{totalObj.totalPurchase.format()}</h2>
                <h3 className={styles.totalSpendSubhead}>{new Intl.NumberFormat().format(totalObj.totalNumberOfPurchases)} items</h3>
                <h3 className={styles.totalSpendSubSubhead}>{totalObj.totalTax.format()} in taxes</h3>
                <h3 className={styles.totalSpendSubhead}>{averageOrder.format()} average order</h3>
                <h3 className={styles.totalSpendSubSubhead}>{new Intl.NumberFormat().format(totalObj.orderIdArray.length)} total orders</h3>
                <h3 className={styles.totalSpendSubSubhead}>Shipped to {new Intl.NumberFormat().format(totalObj.shippingAddressArray.length)} places</h3>
            </div>
            <hr className={styles.totalDivider}/>
            {mostExpensiveObj && (
                <>
                    <h2 className={styles.expenseHead}>Most Expensive</h2>
                    <div className={styles.expenseContainer}>
                        <RecordItem key={`mostExpensive_${mostExpensiveObj.ASINISBN}`} record={mostExpensiveObj} />
                    </div>
                    <h2 className={styles.expenseHead}>Least Expensive</h2>
                    <div className={styles.expenseContainer}>
                        <RecordItem key={`leastExpensive_${leastExpensiveObj.ASINISBN}`} record={leastExpensiveObj} />
                    </div>
                </>
            )}
            
        </div>
        
    );
}