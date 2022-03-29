import { useState } from 'react';
import { connect } from 'react-redux';
import currency from 'currency.js';

const AmznStock = ({ amznArray }) => {
    const [quantity, setQuantity] = useState(100);
    const [startDate, setStartDate] = useState('1997-05-14');

    let beginPrice = 1.958333;
    let currentPrice = 666;
    let currentDate = '1997-05-14';
    
    if (amznArray.length) {
        beginPrice = amznArray[0].close;
        currentPrice = amznArray[amznArray.length -1].close;
        currentDate = amznArray[amznArray.length -1].theDate;
    }
    const beginCost = quantity * beginPrice;
    const currrentValue = quantity * currentPrice;
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
                {' '}{quantity} shares of AMZN on 
                {' '}{startDate}, the price would have been 
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
                That's a <strong>{increasePercent}%</strong> increase!
            </p>
        </div>
    )
}

const mapStateToProps = (state) => (
    {amznArray: state.amznArray || []}
)

export default connect(mapStateToProps)(AmznStock);
