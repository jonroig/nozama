import date from 'date-and-time';

import AmznImage from "../amznImage";
import AmznLink from '../amznLink';
import styles from '../../styles/Reports.module.css';


export default function RecordItem({record}) {
    if (!record) {
        return (<></>);
    }
    const key = `mostExpensive_${record.ASINISBN}`;
    return (
        <div className={styles.commonRow} key={key}>
            <div className={styles.mostExpensiveCostColumn}>
                {record.ItemTotal.format()}
                <div className={styles.totalSpend}>
                    {date.format(record.OrderDate, 'YYYY-MM-DD')}
                </div>
            </div>
            <div className={styles.column}>
                <AmznLink ASINISBN={record.ASINISBN} title={record.Title} />
                <AmznImage ASINISBN={record.ASINISBN} title={record.Title} />
            </div>
        </div>
    );
}
    