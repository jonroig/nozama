const currency = require('currency.js');

import RecordItem from "./recordItem";

export default function MostExpensive({orderArray}) {
    let mostExpensiveObj = orderArray[0];
    orderArray.forEach(orderObj => {
        const itemTotalValue = orderObj.ItemTotal.value;
        if (itemTotalValue > 0 && itemTotalValue > mostExpensiveObj.ItemTotal.value) {
            mostExpensiveObj = orderObj;
        }
    });

    return (
        <div>
            <h3>Most Expensive</h3>
            <RecordItem record={mostExpensiveObj} />
        </div>
    );
}