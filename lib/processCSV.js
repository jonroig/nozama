import currency  from 'currency.js';
import date from 'date-and-time';

const EURO = value => currency(value, { symbol: '€', decimal: ',', separator: '.' });

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
const cleanOrderObj = (orderObj, tmpCurrency) => {

    if (tmpCurrency === 'USD') {
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
    } else {
        const outputObj = {
            Website: orderObj[0],
            OrderID: orderObj[1],
            OrderDate: orderObj[2],
            PurchaseOrderNumber: orderObj[3],
            Currency: orderObj[4],
            UnitPrice: orderObj[5],
            UnitPriceTax: orderObj[6],
            ShippingCharge: orderObj[7],
            TotalDiscounts: orderObj[8],
            TotalOwed: orderObj[9],
            ShipmentItemSubtotal: orderObj[10],
            ShipmentItemSubtotalTax: orderObj[11],
            ASIN: orderObj[12],
            ProductCondition: orderObj[13],
            Quantity: orderObj[14],
            PaymentInstrumentType: orderObj[15],
            OrderStatus: orderObj[16],
            ShipmentStatus: orderObj[17],
            ShipDate: orderObj[18],
            ShippingOption: orderObj[19],
            ShippingAddress: orderObj[20],
            BillingAddress: orderObj[21],
            CarrierNameTrackingNumber: orderObj[22],
            ProductName: orderObj[23],
            GiftMessage: orderObj[24],
            GiftSenderName: orderObj[25],
            GiftRecipientContactDetails: orderObj[26],
        }
    }
    
};

// process the data we got from the CSV into a more JS-friendly format
const processCSV = (orderObjArray) => {
    
    let tmpCurrency = 'USD';
    // first... let's check the format. Europe is handled differently...
    // @TODO - refine this later
    const testField = orderObjArray[0] || [];
    if (testField.length > 1 && testField[0] === 'Website' && testField[4] === 'Currency') {
        // get currency from the second line... maybe
        tmpCurrency = orderObjArray[1][4];
    }
    

    const outputObj = {
        currency: tmpCurrency,
        orderArray: []
    };
    orderObjArray.forEach((dirtyOrderObj, x)=> {
        if (x > 0) {
            outputObj.orderArray.push(cleanOrderObj(dirtyOrderObj, tmpCurrency))
        };
    });
    return outputObj;
}

const processCSVFromJson = (orderObj) => {
    const outputObj = {
        currency: orderObj.currency,
        orderArray: []
    };

    orderObj.orderArray.forEach((dirtyOrderObj, x)=> {
        if (dirtyOrderObj?.Title) {
            const OrderDate = new Date(dirtyOrderObj.OrderDate);

            if (orderObj.currency === 'USD') {
                const tmpObj = {
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
    
                outputObj.orderArray.push(tmpObj);
            }
        }
    });

    return outputObj;
}


module.exports = {
    processCSV,
    processCSVFromJson
};
