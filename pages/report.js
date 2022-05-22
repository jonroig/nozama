;import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Head from 'next/head';

import 'react-tabs/style/react-tabs.css';
import styles from '../styles/Reports.module.css';
import { loadData } from '../actions';

import TotalPurchases from '../components/reportModules/totalPurchases';
import ByYear from '../components/reportModules/byYear';
import ByDay from '../components/reportModules/byDay';
import AccumulationByDay from '../components/reportModules/accumulationByDay';


const MostCommon = dynamic(
    () => import('../components/reportModules/mostCommon'),
    { ssr: false }
  );

const ByCategory = dynamic(
    () => import('../components/reportModules/byCategory'),
    { ssr: false }
);

const Stocks = dynamic(
    () => import('../components/reportModules/stocks'),
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
    
    const outputArray = state.orderArray;
    const amznArray = state.amznArray;
    return (
        <>
            <Head>
                <title>Nozama: Report</title>
                <meta name="description" content="Analyze your Amazon purchase history." />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>

            <div className={styles.container}> 
                <Tabs>
                    <TabList>
                        <Tab>Main</Tab>
                        <Tab>Stock</Tab>
                        <Tab>By Year</Tab>
                        <Tab>By Day</Tab>
                        <Tab>Over Time</Tab>
                        <Tab>Most Common</Tab>
                        <Tab>By Category</Tab>
                    </TabList>

                    <TabPanel>
                        <TotalPurchases orderArray={outputArray} amznArray={amznArray} />
                    </TabPanel>
                    <TabPanel>
                        <Stocks orderArray={outputArray} amznArray={amznArray} />
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
            </div>
        </>
        
    );
}
