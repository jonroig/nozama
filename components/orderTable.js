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
    
    const BLAHcolumns = [
        { title: "First Name", width: 100 },
        { title: "Last Name", width: 100 }
    ];
    const numRows = 3;
    // const getData = () => {};

    const images = [
        "https://avatars.githubusercontent.com/in/29110",
        "https://avatars.githubusercontent.com/u/10679635",
        "https://avatars.githubusercontent.com/in/15368"
      ];
      
    const getData = ([col, row]) => {
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
            <DataEditor getCellContent={getData} columns={BLAHcolumns} rows={numRows} />
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