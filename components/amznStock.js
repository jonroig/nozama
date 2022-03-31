import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import currency from 'currency.js';
import { Modal } from 'react-responsive-modal';
import DatePicker from "react-datepicker";

import 'react-responsive-modal/styles.css';
import "react-datepicker/dist/react-datepicker.css";


const AmznStock = ({ amznArray }) => {
    const [stockQuantity, setstockQuantity] = useState(100);
    const [startDate, setStartDate] = useState('1997-05-14');
    const [open, setOpen] = useState(false);
    const [beginPrice, setBeginPrice] = useState(1.958333);
    const [currentPrice, setCurrentPrice] = useState(666);
    const [currentDate, setCurrentDate] = useState('1997-05-14');
    const [editField, setEditField] = useState(null);

    useEffect(() => {
        if (amznArray.length) {
            setBeginPrice(amznArray[0].close);
            setCurrentPrice(amznArray[amznArray.length -1].close);
            setCurrentDate(amznArray[amznArray.length -1].theDate);
        }
    },[amznArray]);

    // modal control
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    // stock quantity
    const openChangeStockQuantity = () => {
        setOpen(true);
        setEditField('stockQuantity');
    }
    const onChangeStockQuantity = (e) => {
        setstockQuantity(e.target.value.replace(/\D/g,''));
    }
    
    // start date
    const openChangeStartDate = () => {
        setOpen(true);
        setEditField('startDate');
    }
    const onChangeStartDate = (date) => {
        const newDateObj = amznArray.find(amznObj => amznObj.timestamp === date.getTime());
        if (newDateObj) {
            setStartDate(newDateObj.theDate);
            setBeginPrice(newDateObj.close);
        }
        
        setOpen(false);
    }
    

    const beginCost = stockQuantity * beginPrice;
    const currrentValue = stockQuantity * currentPrice;
    const increasePercent = (currrentValue/beginCost).toFixed(2);

    const currentPriceCurrency = currency(currentPrice);
    const currentValueCurrency = currency(currrentValue);
    const beginPriceCurrency = currency(beginPrice);
    const beginCostCurrency = currency(beginCost);

    return (

        <div>
            <p>
                <strong>Fun fact!</strong>
                {' '}Did you know that if you bought 
                {' '}<span onClick={openChangeStockQuantity}>{stockQuantity}</span> shares of AMZN on 
                {' '}<span onClick={openChangeStartDate}>{startDate}</span>, the price would have been 
                {' '}{beginPriceCurrency.format()} and it would have 
                cost you
                {' '}{beginCostCurrency.format()}.
            </p>
            <p>
                Today ({currentDate}), AMZN is worth
                {' '}{currentPriceCurrency.format()}/share.
            </p>
            <p>
                That investment would be worth 
                {' '}<strong>{currentValueCurrency.format()}!</strong>
            </p>
            <p>
                That&apos;s a <strong>{increasePercent}%</strong> increase!
            </p>

            <button onClick={onOpenModal}>Open modal</button>
            <Modal open={open} onClose={onCloseModal} center>
                {editField === 'stockQuantity' && (
                    <div>
                        <h2>Edit Quantity</h2>
                        Stock quantity:
                         <input onChange={onChangeStockQuantity} />
                    </div>
                )}
                {editField === 'startDate' && (
                    <div style={{height: 300, width: 200}}>
                        <DatePicker 
                            selected={new Date(startDate)} 
                            onChange={(date) => onChangeStartDate(date)} />
                    </div>
                )}
                
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => (
    {amznArray: state.amznArray || []}
)

export default connect(mapStateToProps)(AmznStock);


