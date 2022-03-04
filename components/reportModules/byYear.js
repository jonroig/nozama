import currency  from 'currency.js';
import date from 'date-and-time';


export default function ByYear({orderArray}) {
    const yearObj = {};
    orderArray.forEach(orderObj => {
        if (orderObj.OrderDate) {
            const orderYear = date.format(orderObj.OrderDate, 'YYYY');
            if (!yearObj[orderYear]) {
                yearObj[orderYear] = {
                    total: currency(0), 
                    records: []
                };
            }
            yearObj[orderYear].records.push(orderObj.OrderID);
            yearObj[orderYear].total = yearObj[orderYear].total.add(orderObj.ItemTotal);
        }
        
    });

    return (
        <>
            <h3>By Year</h3>
            {Object.keys(yearObj).map(year => (
                <div key={year}>
                    {year} {yearObj[year].records.length} {yearObj[year].total.value}
                </div>
            ))}
        </>
    );
}