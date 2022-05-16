import yahooFinance from 'yahoo-finance2';
import date from 'date-and-time';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import SQL from 'sql-template-strings';



const openDb =  async () => {
    return open({
        filename: './db/amzn.sqlite3',
        driver: sqlite3.cached.Database
    });
};


const getDatabaseData = async (db, todayString) => {
    const result = await db.get(SQL`SELECT * FROM amzn WHERE lastUpdate = ${todayString}`);
    return result;
};


const getStockData = async (todayString) => {
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


const updateDb = async (db, todayString, newStockData) => {
    const jsonData = JSON.stringify(newStockData);
    const updateString = `UPDATE amzn SET lastupdate = '${todayString}', stockdata = '${jsonData}' `;
    return await db.exec(updateString);
};


export default async function amzn(req, res) {
    const db = await openDb();
    const now = new Date();
    const todayString = date.format(now, 'YYYY-MM-DD');
    let rows = await getDatabaseData(db, todayString);
    if (!rows) {
        const newStockData = await getStockData(todayString);
        await updateDb(db, todayString, newStockData);
        rows = await getDatabaseData(db, todayString);
    }
    const jsonStockData = rows.stockdata;
    const stockData = JSON.parse(jsonStockData);
    return res.status(200).json(stockData);    
}
  