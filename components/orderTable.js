import {  useState } from 'react';
import date from 'date-and-time';
import {
    DataEditor,
    DataEditorContainer,
    GridCell,
    GridCellKind
  } from "@glideapps/glide-data-grid";


const affiliateId = 'nozama072-20';
    
export default function OrderTable({records}) {
    const [sortColumn, setSortColumn] = useState('OrderDate');
    const [sortDirection, setSortDirection] = useState('DESC');

    const columns = [
        { 
            title: 'Date', 
            kind: 'Text',
            width: 110,
            source: 'OrderDate',
            sortType: 'date',
            formatter: (orderDate) => (  date.format(orderDate, 'YYYY-MM-DD') )
        },
        { 
            title: 'Quantity', 
            kind: 'Text',
            width: 70,
            source: 'Quantity',
            sortType: 'number',
            formatter: (Quantity) => (Quantity.toString() || 1)
        },
        { 
            title: 'Unit Price', 
            kind: 'Text',
            width: 80,
            source: 'PurchasePricePerUnit',
            sortType: 'money',
            formatter: (purchasePricePerUnit) => (purchasePricePerUnit.format() )
        },
        {
            title: 'Tax',
            kind: 'Text',
            width: 80,
            source: 'ItemSubtotalTax',
            sortType: 'money',
            formatter: (itemSubtotalTax) => ( itemSubtotalTax.format() )
        },
        {
            title: 'Price',
            kind: 'Text',
            width: 80,
            source: 'ItemTotal',
            sortType: 'money',
            formatter: (itemTotal) => ( itemTotal.format() )
        },
        { 
            title: 'OrderID', 
            kind: 'Text',
            width: 175,
            source: 'OrderID',
            sortType: 'text',
        },
    ];

    const sortType = columns.find(columnObj => columnObj.source === sortColumn).sortType;
    const sortedRows = records.sort((a,b) => {
        if (sortType === 'date') {
            return b[sortColumn].getTime() - a[sortColumn].getTime();
        } else if (sortType === 'money') {
            return b[sortColumn].value < a[sortColumn].value ? 1: -1;
        }
        return b[sortColumn] < a[sortColumn] ? 1 : -1;
    });

    const outputRows = sortDirection === 'ASC' ? sortedRows : sortedRows.reverse();

    const cellClicked = (cell) => {
        console.log('cellClicked', cell);
    }

    const headerClicked = (cell) => {
        const newSortColumn = columns[cell].source;
        if (sortColumn === newSortColumn) {
           const newSortDirection =  sortDirection === 'ASC' ? 'DESC' : 'ASC';
           setSortDirection(newSortDirection);
        }
        setSortColumn(newSortColumn);
    }

      
    const getData = ([col, row]) => {
        const columnObj = columns[col];
        const dataSource = columnObj.source;
        const data = outputRows[row][dataSource];
        const displayData = columnObj.formatter ? columnObj.formatter(data) : data;
        
        const outputObj = {
            kind: GridCellKind[columnObj.kind],
            data,
            allowOverlay: false,
            allowAdd: false,
            readonly: true,
            displayData
        }

        return outputObj;
    }

    return (
        <DataEditorContainer width={595} height={278} style={{border: '1px solid black'}}>
            <DataEditor 
                getCellContent={getData} 
                columns={columns} 
                rows={sortedRows.length} 
                onCellClicked={cellClicked}
                onHeaderClicked={headerClicked}
            />
        </DataEditorContainer>
    );
}
