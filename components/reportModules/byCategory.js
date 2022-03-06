import currency  from 'currency.js';
import date from 'date-and-time';
import { useSelector } from 'react-redux';

export default function ByCategory() {
    const state = useSelector((state) => state);

    const byCategory = {};
    state.orderArray.forEach(orderObj => {
        const theCategory = orderObj.Category || 'UNDEFINED';
        if (!byCategory[theCategory]) {
            byCategory[theCategory] = {
                total: currency(0),
                records: []
            }
        }

        byCategory[theCategory].records.push(orderObj.OrderID);
        byCategory[theCategory].total = byCategory[theCategory].total.add(orderObj.ItemTotal);
    });

    const sortedCategoryArray = Object.keys(byCategory).sort((a,b) => (byCategory[b].total.value-byCategory[a].total.value));

    return (
        <>
            <h3>By Cateogry</h3>
            {sortedCategoryArray.map(category => (
                <div key={category}>
                    {category} {byCategory[category].records.length} {byCategory[category].total.value}
                </div>
            ))}
        </>
    );
}