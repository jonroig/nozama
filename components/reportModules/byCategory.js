import currency  from 'currency.js';
import date from 'date-and-time';
import { useSelector } from 'react-redux';

import AmznImage from "../amznImage";
import AmznLink from '../amznLink';
import ImageByASINISBN from '../imageByASINISBN';
import styles from '../../styles/Reports.module.css';
import OrderTable from '../orderTable';

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

const cleanCategory = (inputTitle) => {
    const outputTitle = inputTitle.toLowerCase().replace(/_/g, ' ');
    return outputTitle;
}


export default function ByCategory() {
    const state = useSelector((state) => state);
    const orderArray = state.orderArray || [];
    const byCategory = {};

    orderArray.forEach(orderObj => {
        const theCategory = orderObj.Category || false;
        if (theCategory) {
            if (!byCategory[theCategory]) {
                byCategory[theCategory] = {
                    total: currency(0),
                    records: []
                }
            };
            byCategory[theCategory].records.push(orderObj);
            byCategory[theCategory].total = byCategory[theCategory].total.add(orderObj.ItemTotal);
        }
    });

    const sortedCategoryArray = Object.keys(byCategory).sort((a,b) => (byCategory[b].total.value-byCategory[a].total.value));
    return (
        <>
            <h2>By Category</h2>
            {sortedCategoryArray.map(category => (
                <div key={category} className={styles.otherRow}>
                    <div className={styles.countColumn}>
                        {byCategory[category].records.length} 
                        <div className={styles.totalSpend}>
                            items<br/>
                            {byCategory[category].total.format()}
                        </div>
                    </div>
                    <div className={styles.column}>
                        <h3>
                            <span className={styles.ucFirst}>{cleanCategory(category)}</span>
                        </h3>
                        <div className={styles.row}>
                            <OrderTable 
                                records={byCategory[category].records} 
                                columns={columns}
                                divId={`byCategory_${category}`}
                            />
                        </div>
                        
                    </div>
                </div>
            ))}
        </>
    );
}