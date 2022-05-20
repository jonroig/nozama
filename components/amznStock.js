import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import currency from 'currency.js';
import date from 'date-and-time';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import styles from '../styles/Stock.module.scss';


const AmznStock = ({ amznArray }) => {
    const today = new Date();
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowYear = tomorrow.getFullYear();
    const disabledDays = [
        { 
            from: new Date(1997, 0, 0), 
            to: new Date(1997, 4, 13)
        },
        {
            from: tomorrow,
            to: new Date(tomorrowYear, 12, 31)
        }
    ];

    const [startDate, setStartDate] = useState(new Date(1997, 4, 14));
    const [stockQuantity, setstockQuantity] = useState(100);
    const [beginPrice, setBeginPrice] = useState(1.958333);
    const [currentPrice, setCurrentPrice] = useState(666);

    useEffect(() => {
        if (amznArray.length) {
            setBeginPrice(amznArray[0].close);
            setCurrentPrice(amznArray[amznArray.length -1].close);
        }
    },[amznArray]);

    // stock quantity
    const onChangeStockQuantity = (e) => {
        e.preventDefault();
        setstockQuantity(e.target.value.replace(/\D/g,''));
    };

    const onChangeDate = (newDate) => {
        setStartDate(newDate);
        const tmpArray = amznArray.filter(amznObj => (
            amznObj.timestamp <= newDate.getTime() + 86400000
        ));
        setBeginPrice(tmpArray[tmpArray.length -1].close);
    }

    const beginCost = stockQuantity * beginPrice;
    const currrentValue = stockQuantity * currentPrice;
    const changePercent = currrentValue > beginCost ? 
        `+ ${(currrentValue/beginCost).toFixed(2)}%` :
        `- ${(beginCost/currrentValue).toFixed(2)}%`;


    const currentPriceCurrency = currency(currentPrice);
    const currentValueCurrency = currency(currrentValue);
    const beginPriceCurrency = currency(beginPrice);
    const beginCostCurrency = currency(beginCost);

    const dt = new Date();
    return (
    <>
        <div className={styles.table}>
            <div className={styles.tr}>
                <div className={styles.td}>
                    <div className={styles.tr}>
                        <div className={styles.tdLeft }>AMZN shares</div>
                        <div className={styles.tdRight}><input type="text" value={stockQuantity} onChange={onChangeStockQuantity}/></div>
                    </div>
                    <div className={styles.tr}>
                        <div className={styles.tdLeft}>Date</div>
                        <div className={styles.tdRight}>{date.format(startDate, 'YYYY-MM-DD')}</div>
                    </div>
                    <div className={styles.tr}>
                        <div className={styles.tdLeft}>Cost/share</div>
                        <div className={styles.tdRight}>{beginPriceCurrency.format()}</div>
                    </div>
                    <div className={styles.tr}>
                        <div className={styles.tdLeft}>Total cost</div>
                        <div className={styles.tdRight}>{beginCostCurrency.format()}</div>
                    </div>
                    <div className={styles.tr}>
                        <div className={styles.tdLeft}>Today</div>
                        <div className={styles.divider}>&nbsp;</div>
                    </div>
                    <div className={styles.tr}>
                        <div className={styles.tdLeft}>AMZN/share</div>
                        <div className={styles.tdRight}>{currentPriceCurrency.format()}</div>
                    </div>
                    <div className={styles.tr}>
                        <div className={styles.tdLeft}>Total</div>
                        <div className={styles.tdRight}>{currentValueCurrency.format()}</div>
                    </div>
                    <div className={styles.tr}>
                        <div className={styles.tdLeft}>&nbsp;</div>
                        <div className={styles.tdRight}>{changePercent}</div>
                    </div>
                </div>
                <div className={styles.td}>
                    <DayPicker 
                        fromYear={1997}
                        toYear={date.format(today, 'YYYY')}
                        captionLayout="dropdown" 
                        mode="single"
                        selected={startDate}
                        onSelect={onChangeDate}
                        required
                        disabled={disabledDays}
                        defaultMonth={new Date(1997, 4)}
                    />
                </div>
            </div>
            
        </div>
    </>
    )
}

const mapStateToProps = (state) => (
    {amznArray: state.amznArray || []}
)

export default connect(mapStateToProps)(AmznStock);


