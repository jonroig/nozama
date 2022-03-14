import currency  from 'currency.js';

import AmznImage from "../amznImage";
import AmznLink from '../amznLink';
import styles from '../../styles/Reports.module.css';
import OrderTable from '../orderTable';
import ImageByASINISBN from '../imageByASINISBN';

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
                <div key={`mostCommon_${record.ASINISBN}`} className={styles.commonRow}>
                    <div className={styles.countColumn}>
                        {record.records.length} 
                        <div className={styles.totalSpend}>
                            {record.total.format()}
                        </div>
                        <div>
                       
                        </div>
                    </div>
                    <div className={styles.column}>
                        <h3><AmznLink ASINISBN={record.ASINISBN} title={record.title} /></h3>
                        <OrderTable records={record.records} />
                    </div>
                </div>
            ))}
        </>
    );
}
