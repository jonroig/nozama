const currency = require('currency.js');
const date = require('date-and-time');

const RecordItem = ({record}) => (
    <div>
        Item: {record.Title}<br/>
        Cost: {record.ItemTotal.value}
    </div>
);

const MostCommon = ({records}) => {
    const tmpRecords = records.slice(0, 10);
    
    return (
        <>
            {tmpRecords.map(record => (
                <div key={`mostCommon_${record.ASINISBN}`}>
                    {record.count} {record.Title}
                </div>
            ))}
        </>
    );
}

const ByYear = ({records}) => {
    return (
        <>
            {Object.keys(records).map(year => (
                <div key={year}>
                    {year} {records[year].records.length} {records[year].total.value}
                </div>
            ))}
        </>
    );
}


const ByDay = ({records}) => (
    <>
        {Object.keys(records).map(day => (
            <div key={day}>
                {day} {records[day].records.length} {records[day].total.value}
            </div>
        ))}
    </>
);


export default function Report({orderObj}) {

    console.log('orderObj', orderObj);
    
    return (
        <div>
            <h1>Report!</h1>
            <div>
                Total Number of Purchases: {orderObj.totalNumberOfPurchases}
            </div>
            <div>
                Total purchase: {orderObj.totalPurchase}
            </div>
            <br/>
            <div>
                Most Expensive:<br/><RecordItem record={orderObj.mostExpensive} />
            </div>
            <br/>
            <div>
                Least Expensive:<br/><RecordItem record={orderObj.leastExpensive} />
            </div>

            <br/>

            <div>
                Most Common: <br/>
                <MostCommon records={orderObj.mostCommon} />
            </div>
            <br/>

            <div>
                By Year:<br/><ByYear records={orderObj.year} />
            </div>

            <div>
                By Day:<br/><ByDay records={orderObj.byDay} />
            </div>


        </div>
    );
  }