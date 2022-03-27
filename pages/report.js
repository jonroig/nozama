import {useState} from 'react';
import date from 'date-and-time';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import styles from '../styles/Reports.module.css';
import { loadData } from '../actions';

import RecordItem from '../components/reportModules/recordItem';
import TotalPurchases from '../components/reportModules/totalPurchases';
import MostExpensive from '../components/reportModules/mostExpensive';
// import MostCommon from '../components/reportModules/mostCommon';
import ByYear from '../components/reportModules/byYear';
import ByDay from '../components/reportModules/byDay';
// import ByCategory from '../components/reportModules/byCategory';
import AccumulationByDay from '../components/reportModules/accumulationByDay';

const MostCommon = dynamic(
    () => import('../components/reportModules/mostCommon'),
    { ssr: false }
  );

const ByCategory = dynamic(
    () => import('../components/reportModules/byCategory'),
    { ssr: false }
);




export default function Report() {
    const dispatch = useDispatch();
    const router = useRouter();

    const state = useSelector((state) => state);
    useEffect(() => {
        if (!state || !state.orderArray || state.orderArray.length === 0) {
            router.push('/');
        }
    },[]);

    const clearReport = () => {
        if (typeof window !== "undefined") {
            localStorage.setItem('orderArray', JSON.stringify([]));
            dispatch(loadData([]));
        }
        router.push('/');
    }
    
    const outputArray = state.orderArray;
    console.log(outputArray);
    return (
        <div className={styles.container}> 
            <Tabs>
                <TabList>
                    <Tab>Main</Tab>
                    <Tab>By Year</Tab>
                    <Tab>By Day</Tab>
                    <Tab>Over Time</Tab>
                    <Tab>Most Common</Tab>
                    <Tab>By Category</Tab>
                </TabList>

                <TabPanel>
                    <TotalPurchases orderArray={outputArray} />
                </TabPanel>
                <TabPanel>
                    <ByYear orderArray={outputArray} />
                </TabPanel>
                <TabPanel>
                    <ByDay orderArray={outputArray} />
                </TabPanel>
                <TabPanel>
                    <AccumulationByDay orderArray={outputArray} />
                </TabPanel>
                <TabPanel>
                    <MostCommon orderArray={outputArray} />
                </TabPanel>
                <TabPanel>
                    <ByCategory orderArray={outputArray} />
                </TabPanel>
            </Tabs>

            <div onClick={clearReport} className={styles.clearReport}>
                Clear report
            </div>
        </div>
    );
}
