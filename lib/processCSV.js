import currency  from 'currency.js';
import date from 'date-and-time';

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
    const OrderDate = new Date(orderObj[0]);

    const outputObj = {
        OrderDate: OrderDate.getTime() === OrderDate.getTime() ? OrderDate : null,
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

// process the data we got from the CSV into a more JS-friendly format
const processCSV = (orderObjArray) => {
    const outputObj = {
        totalPurchase: 0,
        totalNumberOfPurchases: 0,
        avgPurchase: 0,
        mostExpensive: cleanOrderObj(orderObjArray[1]),
        leastExpensive: cleanOrderObj(orderObjArray[1]),
        dayOfWeek: {
            Monday: {total: currency(0), records: []},
            Tuesday: {total: currency(0), records: []},
            Wednesday: {total: currency(0), records: []},
            Thursday: {total: currency(0), records: []},
            Friday: {total: currency(0), records: []},
            Saturday: {total: currency(0), records: []},
            Sunday: {total: currency(0), records: []}
        },
        month: {
            January: {total: currency(0), records: []},
            February: {total: currency(0), records: []},
            March: {total: currency(0), records: []},
            April: {total: currency(0), records: []},
            May: {total: currency(0), records: []},
            June: {total: currency(0), records: []},
            July: {total: currency(0), records: []},
            August: {total: currency(0), records: []},
            September: {total: currency(0), records: []},
            October: {total: currency(0), records: []},
            November: {total: currency(0), records: []},
            December: {total: currency(0), records: []}
        },
        year: {},
        mostCommon: [],
        records: [],
        byDay: {}
    };

    const tmpAsinCountObj = {};
    let tmpTotalPurchase = currency(0);
    orderObjArray.forEach((dirtyOrderObj, x)=> {
        if (x > 0) {
            const orderObj = cleanOrderObj(dirtyOrderObj);
            const itemTotalValue = orderObj.ItemTotal.value;
            if (orderObj.OrderDate) {
                orderObj.orderDay = date.format(orderObj.OrderDate,'dddd'); 
                orderObj.orderMonth = date.format(orderObj.OrderDate, 'MMMM');
                orderObj.orderYear = date.format(orderObj.OrderDate, 'YYYY');

                const tmpByDay = date.format(orderObj.OrderDate, 'YYYY-MM-DD');
                if (!outputObj.byDay[tmpByDay]) {
                    outputObj.byDay[tmpByDay] = {
                        total: currency(0),
                        records: []
                    }
                }
                outputObj.byDay[tmpByDay].records.push(orderObj.OrderID);
                outputObj.byDay[tmpByDay].total = outputObj.byDay[tmpByDay].total.add(orderObj.ItemTotal);

                // day of the week
                outputObj.dayOfWeek[orderObj.orderDay].records.push(orderObj.OrderID);
                outputObj.dayOfWeek[orderObj.orderDay].total = outputObj.dayOfWeek[orderObj.orderDay].total.add(orderObj.ItemTotal);

                // month
                outputObj.month[orderObj.orderMonth].records.push(orderObj.OrderID);
                outputObj.month[orderObj.orderMonth].total = outputObj.month[orderObj.orderMonth].total.add(orderObj.ItemTotal);
                
                // year
        
                if (!outputObj.year[orderObj.orderYear]) {
                    outputObj.year[orderObj.orderYear] = {
                        total: currency(0), 
                        records: []
                    };
                }
                outputObj.year[orderObj.orderYear].records.push(orderObj.OrderID);
                outputObj.year[orderObj.orderYear].total = outputObj.year[orderObj.orderYear].total.add(orderObj.ItemTotal);
            }
            
            outputObj.records.push(orderObj);
            

            // running totals
            outputObj.totalNumberOfPurchases++;
            tmpTotalPurchase = tmpTotalPurchase.add(orderObj.ItemTotal);
           
            // ASIN count
            if (!tmpAsinCountObj[orderObj.ASINISBN]) {
                tmpAsinCountObj[orderObj.ASINISBN] = 0;
            }   
            tmpAsinCountObj[orderObj.ASINISBN]++;

            // most expensive
            if (itemTotalValue > 0 && itemTotalValue > outputObj.mostExpensive.ItemTotal.value) {
                outputObj.mostExpensive = orderObj;
            }
            
            // least expensive
            if (itemTotalValue > 0 && itemTotalValue < outputObj.leastExpensive.ItemTotal.value) {
                outputObj.leastExpensive = orderObj;
            }
        }
    });

    // do some aggregation
    outputObj.totalPurchase = tmpTotalPurchase.value;
    outputObj.avgPurchase = currency(outputObj.totalPurchase / outputObj.totalNumberOfPurchases).value;

    // most common items, grouped
    const sortedTmpAsinCountArray = Object.keys(tmpAsinCountObj).sort((a,b) => (tmpAsinCountObj[b]-tmpAsinCountObj[a]));
    sortedTmpAsinCountArray.forEach(ASIN => {
        if (tmpAsinCountObj[ASIN] > 1) {
            const tmpOrderObj = outputObj.records.find(record => record.ASINISBN === ASIN);
            const tmpObj = {
                count: tmpAsinCountObj[ASIN],
                Title: tmpOrderObj.Title,
                ASINISBN: tmpOrderObj.ASINISBN
            };
            outputObj.mostCommon.push(tmpObj)
        }
    });
    
    return outputObj;
}


module.exports ={
    processCSV
};
