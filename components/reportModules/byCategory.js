import currency  from 'currency.js';
import date from 'date-and-time';
import { useSelector } from 'react-redux';

import AmznImage from "../amznImage";
import AmznLink from '../amznLink';
import ImageByASINISBN from '../ImageByASINISBN';
import styles from '../../styles/Reports.module.css';


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
                    records: [],
                    asinObj: {}
                }
            }
            byCategory[theCategory].asinObj[orderObj.ASINISBN] = true;
            byCategory[theCategory].records.push(orderObj.OrderID);
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
                            <span className={ styles.ucFirst}>{cleanCategory(category)}</span>
                        </h3>
                        <div className={styles.row}>
                        {Object.keys(byCategory[category].asinObj).map(ASINISBN => (
                            <ImageByASINISBN ASINISBN={ASINISBN} orderArray={orderArray} format='_SL70_' />
                        ))}
                        </div>
                        
                    </div>
                </div>
            ))}
        </>
    );
}