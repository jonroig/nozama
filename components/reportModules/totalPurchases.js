export default function TotalPurchaes({orderObj}) {
    return (
        <>
            <h3>Overview</h3>
            <div>
                Total Number of Purchases: {orderObj.totalNumberOfPurchases}
            </div>
            <div>
                Total purchase: {orderObj.totalPurchase}
            </div>
        </>
    );
}