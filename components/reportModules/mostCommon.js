import currency  from 'currency.js';
import date from 'date-and-time';
import {useState} from 'react';

import AmznLink from '../amznLink';
import AmznImage from '../amznImage';
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

const baseCount = 10;

export default function MostCommon({orderArray}) {
    const [commonCount, setCommonCount] = useState(baseCount);
    const [sortBy, setSortBy] = useState('common');

    const sortByCommon = () => {
        setSortBy('common');
    };

    const sortBySpend = () => {
        setSortBy('spend');
    };

    const showMore = () => {
        setCommonCount(commonCount + baseCount);
    };

    const showLess = () => {
        setCommonCount(commonCount - baseCount);
    };

    const tmpAsinCountObj = {};
    orderArray.forEach(orderObj => {
        if (!orderObj.Title) {
            return;
        }
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
    const sortedTmpAsinCountArray = Object.keys(tmpAsinCountObj).sort((a,b) => {
        if (sortBy === 'common') {
            return tmpAsinCountObj[b].records.length-tmpAsinCountObj[a].records.length;
        }
        else if (sortBy === 'spend') {
            return tmpAsinCountObj[b].total.value > tmpAsinCountObj[a].total.value ? 1:-1;
        }
    });

    sortedTmpAsinCountArray.forEach(ASINISBN => {
        mostCommon.push(tmpAsinCountObj[ASINISBN])
    });

    const tmpRecords = mostCommon.slice(0, commonCount);
    const shouldShowMore = commonCount < mostCommon.length;
    const shouldShowLess = mostCommon.length > baseCount && commonCount > baseCount;
    
    return (
        <>
            <h1 className={styles.areaHead}>Most Common</h1>
            Sort: 
            <>
                <div onClick={sortByCommon} href="#">Most Common</div>
                <div onClick={sortBySpend} href="#">Most Money</div>
            </>
            
            {tmpRecords.map(record => (
                <div key={`mostCommon_${record.ASINISBN}`} id={`mostCommon_${record.ASINISBN}`} className={styles.table}>
                     <div className={styles.row}>
                        <div className={styles.cell}>
                            <h3 className={[styles.ucFirst, styles.commonHeadline].join(' ')}>
                                <AmznLink record={record}/>
                            </h3>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.cell}>
                            <AmznImage 
                                ASINISBN={record.ASINISBN} 
                                title={record.title}
                                format='_SL80_'
                            />
                        </div>
                        <div className={[styles.cell, styles.moneyzone].join(' ')}>
                            <span className={styles.countColumn}>
                                {record.records.length} 
                            </span>
                            <span className={styles.totalSpend}>
                                items <br/>
                                {record.total.format()}
                            </span>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <OrderTable 
                            records={record.records} 
                            columns={columns}
                            divId={`mostCommon`}
                        />
                    </div>
                </div>
            ))}
            <>
                {shouldShowMore && (
                    <div onClick={showMore}>More...</div>
                )}
                {shouldShowLess && (
                    <div onClick={showLess}>...Less</div>
                )}
            </>
            
        </>
    );
}
