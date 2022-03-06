const date = require('date-and-time');
import { useSelector } from 'react-redux';


import styles from '../styles/Reports.module.css';

import RecordItem from '../components/reportModules/recordItem';
import TotalPurchases from '../components/reportModules/totalPurchases';
import MostExpensive from '../components/reportModules/mostExpensive';
import LeastExpensive from '../components/reportModules/leastExpensive';
import MostCommon from '../components/reportModules/mastCommon';
import ByYear from '../components/reportModules/byYear';
import ByDay from '../components/reportModules/byDay';
import ByCategory from '../components/reportModules/byCategory';
import AccumulationByDay from '../components/reportModules/AccumulationByDay';

export default function Report() {
    const state = useSelector((state) => state);

    console.log('orderArray', state.orderArray);

    const outputArray = state.orderArray;
    
    return (
        <div className={styles.container}>         
            <TotalPurchases orderArray={outputArray} />
            <ByYear orderArray={outputArray} />
            <AccumulationByDay orderArray={outputArray} />
        <MostExpensive orderArray={outputArray} />
        <LeastExpensive orderArray={outputArray} />
        <MostCommon orderArray={outputArray} />
        <ByDay orderArray={outputArray} />
        <ByCategory orderArray={outputArray} />
        </div>
    );
}
