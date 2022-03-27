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
    const outputArray = [];
    orderObjArray.forEach((dirtyOrderObj, x)=> {
        if (x > 0) {
            outputArray.push(cleanOrderObj(dirtyOrderObj))
        };
    });

    return outputArray;
}

const processCSVFromJson = (orderObjArray) => {
    const outputArray = [];
    orderObjArray.forEach((dirtyOrderObj, x)=> {
        const OrderDate = new Date(dirtyOrderObj.OrderDate);

        const outputObj = {
            ... dirtyOrderObj,
            OrderDate: OrderDate.getTime() === OrderDate.getTime() ? OrderDate : null,
            ReleaseDate: dirtyOrderObj.ReleaseDate = new Date(dirtyOrderObj.ReleaseDate) || null,
            ListPricePerUnit: currency(dirtyOrderObj.ListPricePerUnit),
            PurchasePricePerUnit: currency(dirtyOrderObj.PurchasePricePerUnit),
            ShipmentDate: new Date(dirtyOrderObj.ShipmentDate),
            ItemSubtotal: currency(dirtyOrderObj.ItemSubtotal),
            ItemSubtotalTax: currency(dirtyOrderObj.ItemSubtotalTax),
            ItemTotal: currency(dirtyOrderObj.ItemTotal),
        };

        outputArray.push(outputObj);
    });

    return outputArray;
}


module.exports = {
    processCSV,
    processCSVFromJson
};
