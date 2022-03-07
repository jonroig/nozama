const currency = require('currency.js');

import RecordItem from "./recordItem";

export default function MostExpensive({orderArray}) {
    const tmpArray = orderArray.filter(orderObj => orderObj.ItemTotal.value !== 0);

    const sortedLeastExpensive = tmpArray.sort((a,b) => (
        a.ItemTotal.value - b.ItemTotal.value
    ));

    const outputArray = sortedLeastExpensive.slice(0, 10);

    return (
        <div>
            <h3>Least Expensive</h3>
            {outputArray.map(record => (
                <RecordItem record={record} />
            ))}
        </div>
    );
}