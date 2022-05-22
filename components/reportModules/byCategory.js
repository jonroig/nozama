import currency  from 'currency.js';
import date from 'date-and-time';
import { useSelector } from 'react-redux';
import {useState} from 'react';

import styles from '../../styles/Reports.module.css';
import OrderTable from '../orderTable';
import { cleanCategory } from '../../lib/cleanCategory';


const columns = [
    { 
        title: '', 
        kind: 'Image',
        width: 75,
        source: 'ASINISBN',
        clickAction: 'product'
    },
    { 
        title: 'Item', 
        kind: 'Text',
        width: 175,
        source: 'Title',
        sortType: 'text',
        clickAction: 'product'
    },
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
        sortType: 'text',
        clickAction: 'order'
    },
    {
        title: 'List Price',
        kind: 'Text',
        width: 80,
        source: 'ListPricePerUnit',
        sortType: 'money',
        formatter: (itemTotal) => (itemTotal.format())
    },
    {
        title: 'Seller',
        kind: 'Text',
        width: 150,
        source: 'Seller',
        sortType: 'text'
    },
    {
        title: 'Category',
        kind: 'Text',
        width: 150,
        source: 'Category',
        sortType: 'text',
        clickAction: 'category',
        formatter: (category) => (cleanCategory(category))
    },
    {
        title: 'Name',
        kind: 'Text',
        width: 150,
        source: 'ShippingAddressName',
        sortType: 'text'
    },
    {
        title: 'Address',
        kind: 'Text',
        width: 150,
        source: 'ShippingAddressStreet1',
        sortType: 'text'
    },
    {
        title: 'Address 2',
        kind: 'Text',
        width: 150,
        source: 'ShippingAddressStreet2',
        sortType: 'text'
    },
    {
        title: 'City',
        kind: 'Text',
        width: 150,
        source: 'ShippingAddressCity',
        sortType: 'text'
    },
    {
        title: 'Zip',
        kind: 'Text',
        width: 80,
        source: 'ShippingAddressZip',
        sortType: 'text'
    }
];


const baseCount = 10;

export default function ByCategory() {
    const [categoryCount, setCategoryCount] = useState(baseCount);
    const [sortBy, setSortBy] = useState('count');

    const sortByCount = () => {
        setSortBy('count');
    };

    const sortBySpend = () => {
        setSortBy('spend');
    };

    const showMore = () => {
        setCategoryCount(categoryCount + baseCount);
    };

    const showLess = () => {
        setCategoryCount(categoryCount - baseCount);
    };


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


    const countButtonClassname = null;
    const moneyButtonClassname = null;
    const sortedCategoryArray = Object.keys(byCategory).sort((a,b) => {
        if (sortBy === 'count') {
            countButtonClassname = 'selectedOption';
            moneyButtonClassname = 'unselectedOption';
            return byCategory[b].records.length - byCategory[a].records.length;
        }
        if (sortBy === 'spend') {
            countButtonClassname = 'unselectedOption';
            moneyButtonClassname = 'selectedOption';
            return byCategory[b].total.value-byCategory[a].total.value;
        }
    });
    
    
    const outputSortedCategoryArray = sortedCategoryArray.slice(0, categoryCount);
    const shouldShowMore = categoryCount < sortedCategoryArray.length;
    const shouldShowLess = categoryCount.length > baseCount && categoryCount > baseCount;

    return (
        <>
            <h1 className={styles.areaHead}>By Category</h1>
            Sort: 
            <>
                <span onClick={sortByCount} className={countButtonClassname}>Most Items</span>
                <span onClick={sortBySpend} className={moneyButtonClassname}>Most Money</span>
            </>
            {outputSortedCategoryArray.map(category => (
                <div key={category} className={styles.table}>
                    
                    <div className={styles.row}>
                        <div className={styles.cell}>
                            <h3 className={[styles.ucFirst, styles.commonHeadline].join(' ')}>  
                                {cleanCategory(category)}
                            </h3>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.cell}>
                            <span className={styles.countColumn}>
                                {byCategory[category].records.length} 
                            </span>
                            <span className={styles.totalSpend}>
                                items <br/>
                                {byCategory[category].total.format()}
                            </span>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <OrderTable 
                            records={byCategory[category].records} 
                            columns={columns}
                            divId={`byCategory`}
                        />
                    </div>
                </div>
            ))}
            <>
                {shouldShowMore && (
                    <div className='moreEntries' onClick={showMore}>More...</div>
                )}
            </>
        </>
    );
}