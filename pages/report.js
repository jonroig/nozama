const date = require('date-and-time');
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';


import styles from '../styles/Reports.module.css';

import RecordItem from '../components/reportModules/recordItem';
import TotalPurchases from '../components/reportModules/totalPurchases';
import MostExpensive from '../components/reportModules/mostExpensive';
import MostCommon from '../components/reportModules/mostCommon';
import ByYear from '../components/reportModules/byYear';
import ByDay from '../components/reportModules/byDay';
import ByCategory from '../components/reportModules/byCategory';
import AccumulationByDay from '../components/reportModules/AccumulationByDay';



export default function Report() {
    const router = useRouter();
    const state = useSelector((state) => state);
    useEffect(() => {
        if (!state || !state.orderArray || state.orderArray.length === 0) {
            router.push('/');
        }
    });
    
    const outputArray = state.orderArray;
    console.log(outputArray);
    return (
        <div className={styles.container}>         
            <TotalPurchases orderArray={outputArray} />
            <ByYear orderArray={outputArray} />
            <ByDay orderArray={outputArray} />
            <AccumulationByDay orderArray={outputArray} />
            <MostCommon orderArray={outputArray} />
            <ByCategory orderArray={outputArray} />
            <MostExpensive orderArray={outputArray} />
        </div>
    );
}
