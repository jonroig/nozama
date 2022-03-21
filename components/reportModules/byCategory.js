import currency  from 'currency.js';
import date from 'date-and-time';
import { useSelector } from 'react-redux';
import {useState} from 'react';

import styles from '../../styles/Reports.module.css';
import OrderTable from '../orderTable';


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
];

const cleanCategory = (inputTitle) => {
    const outputTitle = inputTitle.toLowerCase().replace(/_/g, ' ');
    return outputTitle;
}

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
            <h2>By Category</h2>
            Sort: 
            <>
                <span onClick={sortByCount} className={countButtonClassname}>Most Items</span>
                <span onClick={sortBySpend} className={moneyButtonClassname}>Most Money</span>
            </>
            {outputSortedCategoryArray.map(category => (
                <div key={category} className={styles.table}>
                    
                    <div className={styles.row}>
                        <div className={styles.cell}>
                            <h3 className={[styles.ucFirst, styles.headline].join(' ')}>
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
                {shouldShowLess && (
                    <div className={moreEntries} onClick={showLess}>...Less</div>
                )}
            </>
        </>
    );
}