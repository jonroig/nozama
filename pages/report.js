;import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Head from 'next/head';
import date from 'date-and-time';

import 'react-tabs/style/react-tabs.css';
import styles from '../styles/Reports.module.css';

import TotalPurchases from '../components/reportModules/totalPurchases';
import ByYear from '../components/reportModules/byYear';
import ByDay from '../components/reportModules/byDay';
import AccumulationByDay from '../components/reportModules/accumulationByDay';
import Filter from '../components/reportModules/filter';

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
    const { query } = useRouter();

    const state = useSelector((state) => state);
    useEffect(() => {
        if (!state || !state.orderArray || state.orderArray.length === 0) {
            const goTo = query?.returnPath === 'pwa' ? '/index_pwa' : '/';
            router.push(goTo);
        }
    },[]);
    
    const orderArray = state.orderArray;
    let filteredOrderArray = orderArray;
    let filterObj = {};
    if (state?.filterObj?.startDate && state?.filterObj?.endDate) {
        filterObj = {
            startDate: new Date(state.filterObj.startDate),
            endDate: new Date(state.filterObj.endDate)
        };

        filteredOrderArray = orderArray.filter(orderObj => (
            orderObj.OrderDate >= state.filterObj.startDate 
            && orderObj.OrderDate <= state.filterObj.endDate
        ));
    } 

    const amznArray = state.amznArray;
    return (
        <>
            <Head>
                <title>Nozama: Report</title>
                <meta name="description" content="Analyze your Amazon shopping history." />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/manifest.json" />
            </Head>

            <div className={styles.container}> 
                <Tabs selectedTabClassName="reportTabSelected">
                    <TabList>
                        <Tab>Summary</Tab>
                        <Tab>Year</Tab>
                        <Tab>Day</Tab>
                        <Tab>Time</Tab>
                        <Tab>Item</Tab>
                        <Tab>Category</Tab>
                        <Tab>Filter</Tab>
                    </TabList>
                    {filterObj?.startDate && (
                        <>
                            <strong>Filter: </strong>
                            {date.format(filterObj.startDate, 'YYYY-MM-DD')}
                            {' '}to{' '}
                            {date.format(filterObj.endDate, 'YYYY-MM-DD')}
                        </>
                    )}
                    <TabPanel>
                        <TotalPurchases orderArray={filteredOrderArray} amznArray={amznArray} />
                    </TabPanel>
                    <TabPanel>
                        <ByYear orderArray={filteredOrderArray} />
                    </TabPanel>
                    <TabPanel>
                        <ByDay orderArray={filteredOrderArray} />
                    </TabPanel>
                    <TabPanel>
                        <AccumulationByDay orderArray={filteredOrderArray} />
                    </TabPanel>
                    <TabPanel>
                        <MostCommon orderArray={filteredOrderArray} />
                    </TabPanel>
                    <TabPanel>
                        <ByCategory orderArray={filteredOrderArray} />
                    </TabPanel>
                    <TabPanel>
                        <Filter orderArray={orderArray} />
                    </TabPanel>
                </Tabs>
            </div>
        </>
        
    );
}
