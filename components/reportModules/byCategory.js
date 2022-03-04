import currency  from 'currency.js';
import date from 'date-and-time';

export default function ByCategory({orderArray}) {
    const byCategory = {};
    orderArray.forEach(orderObj => {
        if (!byCategory[orderObj.Category]) {
            byCategory[orderObj.Category] = {
                total: currency(0),
                records: []
            }
        }

        byCategory[orderObj.Category].records.push(orderObj.OrderID);
        byCategory[orderObj.Category].total = byCategory[orderObj.Category].total.add(orderObj.ItemTotal);
    });

    return (
        <>
            <h3>By Cateogry</h3>
            {Object.keys(byCategory).map(category => (
                <div key={category}>
                    {category} {byCategory[category].records.length} {byCategory[category].total.value}
                </div>
            ))}
        </>
    );
}