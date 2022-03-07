const currency = require('currency.js');

import RecordItem from "./recordItem";

export default function MostExpensive({orderArray}) {

    const sortedMostExpensive = orderArray.sort((a,b) => (
        b.ItemTotal.value - a.ItemTotal.value
    ));

    const outputArray = sortedMostExpensive.slice(0, 10);
    console.log(outputArray);
    return (
        <div>
            <h3>Most Expensive</h3>
            {outputArray.map(record => (
                <RecordItem record={record} />
            ))}
        </div>
    );
}