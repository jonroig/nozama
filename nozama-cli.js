const parseCSV = require('./lib/parsecsv');
const currency = require('currency.js');
const date = require('date-and-time');

// url "https://query1.finance.yahoo.com/v7/finance/download/AMZN?period1=863740800&period2=1645574400&interval=1d&events=history&includeAdjustedClose=true"

// just a quick / dumb help func
const cleanBool = (input) => {
    if (input === 'false') {
        return false;
    } else if (input === 'true') {
        return true;
    }

    return input;
};



// process the data we got from the CSV into a more JS-friendly format
const cleanOrderObj = (orderObj) => {
    const outputObj = {
        OrderDate: new Date(orderObj[0]),
        OrderID: orderObj[1],
        Title: orderObj[2],
        Category: orderObj[3],
        ASINISBN: orderObj[4],
        UNSPSCCode: orderObj[5],
        Website: orderObj[6],
        ReleaseDate: orderObj[7] === '' ? null : new Date(orderObj[7]),
        Condition: orderObj[8],
        Seller: orderObj[9],
        SellerCredentials: orderObj[10],
        ListPricePerUnit: currency(orderObj[11]),
        PurchasePricePerUnit: currency(orderObj[12]),
        Quantity: Number(orderObj[13]),
        PaymentInstrumentType: orderObj[14],
        PurchaseOrderNumber: orderObj[15],
        POLineNumber: orderObj[16],
        OrderingCustomerEmail: orderObj[17],
        ShipmentDate: new Date(orderObj[18]),
        ShippingAddressName: orderObj[19],
        ShippingAddressStreet1: orderObj[20],
        ShippingAddressStreet2: orderObj[21],
        ShippingAddressCity: orderObj[22],
        ShippingAddressState: orderObj[23],
        ShippingAddressZip: orderObj[24],
        OrderStatus: orderObj[25],
        CarrierNameTrackingNumber: orderObj[26],
        ItemSubtotal: currency(orderObj[27]),
        ItemSubtotalTax: currency(orderObj[28]),
        ItemTotal: currency(orderObj[29]),
        TaxExemptionApplied: cleanBool(orderObj[30]),
        TaxExemptionType: orderObj[31],
        ExemptionOptOut: cleanBool(orderObj[32]),
        BuyerName: orderObj[33],
        Currency: orderObj[34],
        GroupName: orderObj[35]
    };

    return outputObj;
};


(async () => {
    const records = await parseCSV.processFile('example.csv');
    // console.table(records);

    console.log(`Imported ${records.length} records...` );

    const outputObj = {
        totalPurchase: 0,
        totalNumberOfPurchases: 0,
        avgPurchase: 0,
        mostExpensive: cleanOrderObj(records[0]),
        leastExpensive: cleanOrderObj(records[0]),
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
        cleanRecords: [],
    };

    const tmpAsinCountObj = {};

    let tmpTotalPurchase = currency(0);
    records.forEach(orderObj => {
        const cleanObj = cleanOrderObj(orderObj);
        outputObj.cleanRecords.push(cleanObj);
        const itemTotalValue = cleanObj.ItemTotal.value;
        const orderDay = date.format(cleanObj.OrderDate,'dddd'); 
        const orderMonth = date.format(cleanObj.OrderDate, 'MMMM');
        const orderYear = date.format(cleanObj.OrderDate, 'YYYY');

        // running totals
        outputObj.totalNumberOfPurchases++;
        tmpTotalPurchase = tmpTotalPurchase.add(cleanObj.ItemTotal);

        // day of the week
        outputObj.dayOfWeek[orderDay].count++;
        outputObj.dayOfWeek[orderDay].total.add(cleanObj.ItemTotal);

        // month
        outputObj.month[orderMonth].count++;
        outputObj.month[orderMonth].total.add(cleanObj.ItemTotal);

        // year
        if (!outputObj.year[orderYear]) {
            outputObj.year[orderYear] = {total: currency(0), count: 0};
        }
        outputObj.year[orderYear].count++;
        outputObj.year[orderYear].total.add(cleanObj.ItemTotal);

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
            const tmpOrderObj = outputObj.cleanRecords.find(record => record.ASINISBN === ASIN);
            const tmpObj = {
                count: tmpAsinCountObj[ASIN],
                Title: tmpOrderObj.Title,
                ASINISBN: tmpOrderObj.ASINISBN
            };
            outputObj.mostCommon.push(tmpObj)
        }
    });
    
    // now let's break it down by year / month
    outputObj.cleanRecords.forEach(record => {
        
    });


    // tmp
    outputObj.cleanRecords = null;
    console.log(outputObj);


    // total purchases
    // total number of purchases
    // most expensive purchase
    // cheapest purchase
    // count by day of week
    // month
    // year

         
})()