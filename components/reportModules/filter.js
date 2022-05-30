import date from 'date-and-time';
import { DayPicker } from 'react-day-picker';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import currency  from 'currency.js';
import 'react-day-picker/dist/style.css';


import { updateFilter } from '../../actions';
import styles from '../../styles/Reports.module.css';

  
export default function Filter({orderArray}) {
    const dispatch = useDispatch();

    const sortedByDateArray = orderArray.sort((a,b) => (
        a.OrderDate.getTime() - b.OrderDate.getTime()
    ));
    
    const startTime = sortedByDateArray[0].OrderDate.getTime();
    const startDate = new Date(startTime);
    const dayBeforeStartDate = new Date(startTime);
    dayBeforeStartDate.setDate(dayBeforeStartDate.getDate() - 1);
    
    const endTime = sortedByDateArray[sortedByDateArray.length -1].OrderDate.getTime();
    const endDate = new Date(endTime);
    const dayAfterEndDate = new Date(endTime);
    dayAfterEndDate.setDate(dayAfterEndDate.getDate() + 1);

    const startYear = date.format(startDate, 'YYYY');
    const endYear = date.format(endDate, 'YYYY');
    
    const state = useSelector((state) => state);
    const currentStartDate = state?.filterObj?.startDate ? new Date(state?.filterObj?.startDate) : startDate;
    const currentEndDate = state?.filterObj?.endDate ? new Date(state?.filterObj?.endDate) : endDate;

    let totalPurchase = currency(0);
    orderArray.forEach(orderObj => {
        if (
            orderObj.OrderDate.getTime() >= currentStartDate.getTime()
            && orderObj.OrderDate.getTime() <= currentEndDate.getTime()
        ) {
            totalPurchase = totalPurchase.add(orderObj.ItemTotal);
        }
        
    });

    const onChangeStartDate = (newDate) => {
        const tmpObj = {
            startDate: newDate.getTime(),
            endDate: currentEndDate.getTime()
        };
        dispatch(updateFilter(tmpObj));
    };

    const onChangeEndDate = (newDate) => {
        const tmpObj = {
            startDate: currentStartDate.getTime(),
            endDate: newDate.getTime()
        };
        dispatch(updateFilter(tmpObj));
    };

    const disabledDays = [
        { 
            from: new Date(startYear, 0, 0), 
            to: dayBeforeStartDate
        },
        {
            from: dayAfterEndDate,
            to: new Date(endYear, 12, 31)
        }
    ];

    const isMobile = window.innerWidth < 830;

    return (
        <div>
            {!isMobile && (
                <h1 className={styles.areaHead}>Filter</h1>
            )}
            <div>
                Total: {totalPurchase.format()}
            </div>

            <div className={styles.filterZone}>
                <h2>Begin</h2>
                <div className={styles.daypickerZone}>
                    <DayPicker 
                        fromYear={startYear}
                        toYear={endYear}
                        captionLayout="dropdown" 
                        mode="single"
                        defaultMonth={currentStartDate}
                        disabled={disabledDays}
                        selected={currentStartDate}
                        onSelect={onChangeStartDate}
                    />
                </div>

                <h2>End</h2>
                <div className={styles.daypickerZone}>
                    <DayPicker 
                        fromYear={startYear}
                        toYear={endYear}
                        captionLayout="dropdown" 
                        mode="single"
                        defaultMonth={currentEndDate}
                        disabled={disabledDays}
                        selected={currentEndDate}
                        onSelect={onChangeEndDate}
                    />
                </div>
            </div>
        </div>
    );
}