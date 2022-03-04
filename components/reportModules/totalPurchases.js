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
            <h3>Overview</h3>
            <div>
                Total Number of Purchases: {totalObj.totalNumberOfPurchases}
            </div>
            <div>
                Total purchase: {totalObj.totalPurchase.value}
            </div>
        </>
    );
}