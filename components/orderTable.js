import {useState} from 'react';

import {
    DataEditor,
    DataEditorContainer,
    GridCell,
    GridCellKind
  } from "@glideapps/glide-data-grid";


const affiliateId = 'nozama072-20';

    
export default function OrderTable({records, columns, divId}) {
    const [sortColumn, setSortColumn] = useState('OrderDate');
    const [sortDirection, setSortDirection] = useState('DESC');
    const [expanded, setExpanded] = useState(false);

    // figure out the type of sort we're doing from the column definitions
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


    const sizeChangeClick = () => {
        const newExpanded = !expanded;
        setExpanded(newExpanded);
        if (!newExpanded) {
            const elmnt = document.getElementById(divId);
            elmnt.scrollIntoView();
        }
    }


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
        };

        return outputObj;
    }

    const biggestHeight = (278 / 8) * sortedRows.length;
    const smallestHeight = (278 / 2);
    let outputHeight = biggestHeight;
    if (!expanded) {
        outputHeight = smallestHeight;
    }

    return (
        <>
            <DataEditorContainer 
                width={595} 
                height={outputHeight} 
                style={{border: '1px solid black'}}
            >
                <DataEditor 
                    getCellContent={getData} 
                    columns={columns} 
                    rows={sortedRows.length} 
                    onCellClicked={cellClicked}
                    onHeaderClicked={headerClicked}
                />
            </DataEditorContainer>
            <div onClick={sizeChangeClick}>Expand / Contract</div>
        </>
    );
}
