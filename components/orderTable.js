import {  useState } from 'react';
import DataGrid from 'react-data-grid';
import currency  from 'currency.js';
import date from 'date-and-time';
import { Title } from 'chart.js';

const findByOrderId = (orderId, orderArray, ASINISBN) => (
    orderArray.find(orderObj => orderObj.OrderID === orderId && orderObj.ASINISBN === ASINISBN)
);

const affiliateId = 'nozama072-20';
    
export default function OrderTable({records, orderArray, ASINISBN}) {
    const [sortColumns, setSortColumns] = useState([]);

    const sortTheColumn = (sortColumn) => {
        console.log('sortColumn', sortColumn);
        setSortColumns(sortColumn);
    }

    const rows = records.map(record => (
        findByOrderId(record, orderArray, ASINISBN)
    ));

    const sortedRows = rows.sort((a,b) => (b.OrderDate.getTime() - a.OrderDate.getTime()));
    console.log(sortedRows);
    const columns = [
        { 
            key: 'OrderDate', 
            name: 'Date', 
            sortable: true, 
            sortDescendingFirst: true, 
            width: 125,
            formatter: (props) => (<>{date.format(props.row.OrderDate, 'YYYY-MM-DD')}</>)
        },
        {
            key: 'ItemSubtotal',
            name: 'Price',
            width: 80,
            formatter: (props) => (<>{props.row.ItemSubtotal.format()}</>)
        },
        {
            key: 'ItemSubtotalTax',
            name: 'Tax',
            width: 80,
            formatter: (props) => (<>{props.row.ItemSubtotalTax.format()}</>)
        },
        {
            key: 'ItemTotal',
            name: 'Price',
            width: 80,
            formatter: (props) => (<>{props.row.ItemTotal.format()}</>)
        },
        { 
            key: 'OrderID', 
            name: 'Order ID' 
        },
        
    ];
    
    return (
        <DataGrid 
            columns={columns} 
            rows={sortedRows} 
            sortColumns={sortColumns}
            onSortColumnsChange={sortTheColumn}
        />
    );
}