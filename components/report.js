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
    const outputArray = [];
    tmpRecords.forEach(record => (
        <RecordItem record={record} />
    ));
    return outputArray;
}


export default function Report({records}) {
    const outputObj = {
        totalPurchase: 0,
        totalNumberOfPurchases: 0,
        avgPurchase: 0,
        mostExpensive: records[0],
        leastExpensive: records[0],
        dayOfWeek: {
            Monday: {total: currency(0), count: 0},
            Tuesday: {total: currency(0), count: 0},
            Wednesday: {total: currency(0), count: 0},
            Thursday: {total: currency(0), count: 0},
            Friday: {total: currency(0), count: 0},
            Saturday: {total: currency(0), count: 0},
            Sunday: {total: currency(0), count: 0}
        },
        month: {
            January: {total: currency(0), count: 0},
            February: {total: currency(0), count: 0},
            March: {total: currency(0), count: 0},
            April: {total: currency(0), count: 0},
            May: {total: currency(0), count: 0},
            June: {total: currency(0), count: 0},
            July: {total: currency(0), count: 0},
            August: {total: currency(0), count: 0},
            September: {total: currency(0), count: 0},
            October: {total: currency(0), count: 0},
            November: {total: currency(0), count: 0},
            December: {total: currency(0), count: 0}
        },
        year: {},
        mostCommon: [],
    };

    const tmpAsinCountObj = {};
    let tmpTotalPurchase = currency(0);

    console.log(records);
    records.forEach(cleanObj => {
        const itemTotalValue = cleanObj.ItemTotal.value;

        // running totals
        outputObj.totalNumberOfPurchases++;
        tmpTotalPurchase = tmpTotalPurchase.add(cleanObj.ItemTotal);

        // ASIN count
        if (!tmpAsinCountObj[cleanObj.ASINISBN]) {
            tmpAsinCountObj[cleanObj.ASINISBN] = 0;
        }   
        tmpAsinCountObj[cleanObj.ASINISBN]++;

        // most expensive
        if (itemTotalValue > 0 && itemTotalValue > outputObj.mostExpensive.ItemTotal.value) {
            outputObj.mostExpensive = cleanObj;
        }
        
        // least expensive
        if (itemTotalValue > 0 && itemTotalValue < outputObj.leastExpensive.ItemTotal.value) {
            outputObj.leastExpensive = cleanObj;
        }
    });

    // do some aggregation
    outputObj.totalPurchase = tmpTotalPurchase.value;
    outputObj.avgPurchase = currency(outputObj.totalPurchase / outputObj.totalNumberOfPurchases).value;

    // most common items, grouped
    const sortedTmpAsinCountArray = Object.keys(tmpAsinCountObj).sort((a,b) => (tmpAsinCountObj[b]-tmpAsinCountObj[a]));
    sortedTmpAsinCountArray.forEach(ASIN => {
        if (tmpAsinCountObj[ASIN] > 1) {
            const tmpOrderObj = records.find(record => record.ASINISBN === ASIN);
            const tmpObj = {
                count: tmpAsinCountObj[ASIN],
                Title: tmpOrderObj.Title,
                ASINISBN: tmpOrderObj.ASINISBN
            };
            outputObj.mostCommon.push(tmpObj)
        }
    });

    console.log(outputObj);
    

    return (
        <div>
            <h1>Report!</h1>
            <div>
                Total Number of Purchases: {outputObj.totalNumberOfPurchases}
            </div>
            <div>
                Total purchase: {outputObj.totalPurchase}
            </div>
            <br/>
            <div>
                Most Expensive:<br/><RecordItem record={outputObj.mostExpensive} />
            </div>
            <br/>
            <div>
                Least Expensive:<br/><RecordItem record={outputObj.leastExpensive} />
            </div>

            <div>
                Most Common: <br/>
                <MostCommon records={outputObj.mostCommon} />
            </div>

        </div>
    );
  }