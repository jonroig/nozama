import yahooFinance from 'yahoo-finance2';
import date from 'date-and-time';
import NodeCache from 'node-cache';
const myCache = new NodeCache();





const getStockData = async (todayString) => {
    console.log(`getting stock data for ${todayString}`)
    const queryOptions = {
        period1: '1997-05-14',
        period2: todayString,
        interval: '1d'
    };
    const results = await yahooFinance.historical('AMZN', queryOptions);
    const output = results.map(resultObj => {
        const dateObj = Date.parse(resultObj.date);
        return ({
            timestamp: Date.parse(resultObj.date),
            theDate: date.format(resultObj.date, 'YYYY-MM-DD'),
            close: resultObj.close
        });
    })
    return output;
};


const updateCache = async (todayString, newStockData) => {
    myCache.set( todayString, newStockData, [ 86400 ] )
};


export default async function amzn(req, res) {
    const now = new Date();
    const todayString = date.format(now, 'YYYY-MM-DD');
    let stockData = await myCache.get(todayString);
    if (!stockData) {
        const newStockData = await getStockData(todayString);
        await updateCache(todayString, newStockData);
        stockData = await myCache.get(todayString);
    }

    return res.status(200).json(stockData);    
}
  