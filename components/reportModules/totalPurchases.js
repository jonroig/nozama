import currency  from 'currency.js';

export default function TotalPurchaes({orderArray}) {
    const totalObj = {
        totalNumberOfPurchases: 0,
        totalPurchase: currency(0)
    };

    orderArray.forEach(orderObj => {
        totalObj.totalNumberOfPurchases++;
        totalObj.totalPurchase = totalObj.totalPurchase.add(orderObj.ItemTotal);
    });

    

    return (
        <>
            <h2>{totalObj.totalPurchase.format()} Spent!</h2>
            <h3>{new Intl.NumberFormat().format(totalObj.totalNumberOfPurchases)} Purchases!</h3>
        </>
    );
}