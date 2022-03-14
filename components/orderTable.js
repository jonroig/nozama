import {  useState } from 'react';
import currency  from 'currency.js';
import date from 'date-and-time';
import { Title } from 'chart.js';
import {
    DataEditor,
    DataEditorContainer,
    GridCell,
    GridCellKind
  } from "@glideapps/glide-data-grid";

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
            title: 'Date', 
            kind: 'Text',
            width: 125,
            source: 'OrderDate',
            formatter: (orderDate) => (  date.format(orderDate, 'YYYY-MM-DD') )
        },
        {
            title: 'Price',
            kind: 'Text',
            width: 80,
            source: 'ItemTotal',
            formatter: (itemTotal) => ( itemTotal.format() )
        },
        {
            title: 'Tax',
            kind: 'Text',
            width: 80,
            source: 'ItemSubtotalTax',
            formatter: (itemSubtotalTax) => ( itemSubtotalTax.format() )
        },
        { 
            title: 'OrderID', 
            kind: 'Text',
            width: 100,
            source: 'OrderID',
        },
    ];

    const sourceArray = columns.map(columnObj => columnObj.source);
    
    const numRows = 3;

    const images = [
        "https://avatars.githubusercontent.com/in/29110",
        "https://avatars.githubusercontent.com/u/10679635",
        "https://avatars.githubusercontent.com/in/15368"
      ];
      
      
    const getData = ([col, row]) => {
        console.log([col, row]);
        const columnObj = columns[col];
        console.log('columnObj', columnObj);
        const dataSource = columnObj.source;
        const data = sortedRows[row][dataSource];
        const displayData = columnObj.formatter ? columnObj.formatter(data) : data;
        
        const outputObj = {
            kind: GridCellKind[columnObj.kind],
            data,
            allowOverlay: false,
            allowAdd: false,
            readonly: true,
            displayData
        }
        console.log('outputObj', outputObj)
        return outputObj;

        if (col === 0) {
          return {
            kind: GridCellKind.Image,
            data: [...images],
            displayData: [...images],
            allowOverlay: false,
            allowAdd: false
            // readonly: true,
          };
        } else if (col !== 0) {
          return {
            kind: GridCellKind.Text,
            data: "testing",
            allowOverlay: false,
            displayData: "o"
          };
        } else {
          console.info("err", col);
          throw new Error();
        }
      }

    return (
        <DataEditorContainer width={1000} height={300}>
            <DataEditor getCellContent={getData} columns={columns} rows={numRows} />
        </DataEditorContainer>
    );
}

const blehc = () => {
    <DataEditorContainer width={1000} height={700}>
            <DataEditor getCellContent={getData} columns={BLAHcolumns} rows={numRows} />
        </DataEditorContainer>
}

const blah = () => {
    <DataGrid 
            columns={columns} 
            rows={sortedRows} 
            sortColumns={sortColumns}
            onSortColumnsChange={sortTheColumn}
        />
}