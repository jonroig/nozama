import currency  from 'currency.js';
import date from 'date-and-time';

export default function ByDay({orderArray}) {
    const dayObj = {};
    orderArray.forEach(orderObj => {
        if (orderObj.OrderDate) {
            const orderDay = date.format(orderObj.OrderDate, 'YYYY-MM-DD');
            if (!dayObj[orderDay]) {
                dayObj[orderDay] = {
                    total: currency(0), 
                    records: []
                };
            }
            dayObj[orderDay].records.push(orderObj.OrderID);
            dayObj[orderDay].total = dayObj[orderDay].total.add(orderObj.ItemTotal);
        }
    });
    return (
        <>
            <h3>By Day</h3>
            {Object.keys(dayObj).map(day => (
                <div key={day}>
                    {day} {dayObj[day].records.length} {dayObj[day].total.value}
                </div>
            ))}
        </>
    );
}