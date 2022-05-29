import date from 'date-and-time';

import AmznImage from "../amznImage";
import AmznLink from '../amznLink';
import styles from '../../styles/Reports.module.css';


export default function RecordItem({record}) {
    if (!record || !record.OrderDate) {
        return (<></>);
    }

    return (
        <div>
            <h3 className={styles.expenseHeader}>{record.Title}</h3>
            {record.ItemTotal.format()}
            <br/>
            {date.format(record.OrderDate, 'YYYY-MM-DD')}
            <br/>
            <AmznImage ASINISBN={record.ASINISBN} title={record.Title} format='_SL200_' />
        </div>
    );
}
    