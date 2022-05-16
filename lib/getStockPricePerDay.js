const getStockPricePerDay = (theDate, amznArray) => {
    const orderObjTimestamp = theDate.getTime();
    const amznFilteredArray = amznArray.filter(amznObj =>
        amznObj.timestamp < orderObjTimestamp
    );

    return amznFilteredArray[amznFilteredArray.length-1].close;
}

module.exports = {
    getStockPricePerDay
};