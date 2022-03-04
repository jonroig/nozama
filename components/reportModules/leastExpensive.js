const currency = require('currency.js');

import RecordItem from "./recordItem";

export default function MostExpensive({orderArray}) {
    let leastExpensiveObj = orderArray[0];
    orderArray.forEach(orderObj => {
        const itemTotalValue = orderObj.ItemTotal.value;
        if (itemTotalValue > 0 && itemTotalValue < leastExpensiveObj.ItemTotal.value) {
            leastExpensiveObj = orderObj;
        }
    });

    return (
        <div>
            <h3>Least Expensive</h3>
            <RecordItem record={leastExpensiveObj} />
        </div>
    );
}