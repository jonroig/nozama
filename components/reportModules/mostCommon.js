import currency  from 'currency.js';
import date from 'date-and-time';

import AmznImage from "../amznImage";
import AmznLink from '../amznLink';
import styles from '../../styles/Reports.module.css';
import OrderTable from '../orderTable';
import ImageByASINISBN from '../imageByASINISBN';

const columns = [
    { 
        title: 'Date', 
        kind: 'Text',
        width: 110,
        source: 'OrderDate',
        sortType: 'date',
        formatter: (orderDate) => (date.format(orderDate, 'YYYY-MM-DD'))
    },
    { 
        title: 'Quantity', 
        kind: 'Text',
        width: 70,
        source: 'Quantity',
        sortType: 'number',
        formatter: (Quantity) => (Quantity.toString() || 1)
    },
    { 
        title: 'Unit Price', 
        kind: 'Text',
        width: 80,
        source: 'PurchasePricePerUnit',
        sortType: 'money',
        formatter: (purchasePricePerUnit) => (purchasePricePerUnit.format())
    },
    {
        title: 'Tax',
        kind: 'Text',
        width: 80,
        source: 'ItemSubtotalTax',
        sortType: 'money',
        formatter: (itemSubtotalTax) => (itemSubtotalTax.format())
    },
    {
        title: 'Price',
        kind: 'Text',
        width: 80,
        source: 'ItemTotal',
        sortType: 'money',
        formatter: (itemTotal) => (itemTotal.format())
    },
    { 
        title: 'OrderID', 
        kind: 'Text',
        width: 175,
        source: 'OrderID',
        sortType: 'text'
    },
];

export default function MostCommon({orderArray}) {
    const tmpAsinCountObj = {};
    orderArray.forEach(orderObj => {
        if (!tmpAsinCountObj[orderObj.ASINISBN]) {
            tmpAsinCountObj[orderObj.ASINISBN] = {
                total: currency(0), 
                records: [],
                title: orderObj.Title,
                ASINISBN: orderObj.ASINISBN
            };
        }   
        tmpAsinCountObj[orderObj.ASINISBN].total = tmpAsinCountObj[orderObj.ASINISBN].total.add(orderObj.ItemTotal);
        tmpAsinCountObj[orderObj.ASINISBN].records.push(orderObj);
    });
    
    const mostCommon = [];
    const sortedTmpAsinCountArray = Object.keys(tmpAsinCountObj).sort((a,b) => (tmpAsinCountObj[b].records.length-tmpAsinCountObj[a].records.length));

    sortedTmpAsinCountArray.forEach(ASINISBN => {
        mostCommon.push(tmpAsinCountObj[ASINISBN])
    });

    const tmpRecords = mostCommon.slice(0, 10);
    
    return (
        <>
            <h2>Most Common</h2>
            {tmpRecords.map(record => (
                <div key={`mostCommon_${record.ASINISBN}`} id={`mostCommon_${record.ASINISBN}`} className={styles.commonRow}>
                    <div className={styles.countColumn}>
                        {record.records.length} 
                        <div className={styles.totalSpend}>
                            {record.total.format()}
                        </div>
                        <div>
                       
                        </div>
                    </div>
                    <div className={styles.column}>
                        <h3><AmznLink ASINISBN={record.ASINISBN} title={record.title}/></h3>
                        <OrderTable 
                            records={record.records} 
                            ASINISBN={record.ASINISBN}
                            columns={columns}
                            divId={`mostCommon_${record.ASINISBN}`}
                        />
                    </div>
                </div>
            ))}
        </>
    );
}
