import {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    DataEditor,
    DataEditorContainer,
    GridCell,
    GridCellKind
} from "@glideapps/glide-data-grid";
import isMobile from 'is-mobile';

import config from '../config';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from '../styles/OrderTable.module.css';

const imgFromASINISBN = (ASINISBN => (
    `https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${ASINISBN}&Format=_SL300_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=${config.affiliateId}&language=en_US`
));

const urlFromASINISBN = (ASINISBN => (
    `https://www.amazon.com/dp/${ASINISBN}?tag=${config.affiliateId}`
));

const urlFromCategory = (category => (
    `https://www.amazon.com/s?k=${category}&tag=${config.affiliateId}`
));

const orderUrlFromOrderId = (orderId => (
    `https://www.amazon.com/gp/your-account/order-details/?ie=UTF8&orderID=${orderId}&tag=${config.affiliateId}`
));


export default function OrderTable({records, columns, divId}) {
    const [sortColumn, setSortColumn] = useState('OrderDate');
    const [sortDirection, setSortDirection] = useState('DESC');
    const [expanded, setExpanded] = useState(false);
    const [internalColumns, setInternalColumns] = useState(columns);

    const uuid = uuidv4();
    const uniqueDivId = `${divId}_${uuid}`;
    const target = isMobile() ? null : '_blank';
    const rel = isMobile() ? null : 'noreferrer';

    // figure out the type of sort we're doing from the column definitions
    const sortType = internalColumns.find(columnObj => columnObj.source === sortColumn).sortType;
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
            const elmnt = document.getElementById(uniqueDivId);
            if (!elmnt) {
                return;
            }
            elmnt.scrollIntoView();
        }
    };

    const cellClicked = (cell) => {
        const [column, row] = cell;
        const columnObj = columns[column];
        if (columnObj.clickAction && columnObj.clickAction === 'order') {
            const data = outputRows[row];
            const orderUrl = orderUrlFromOrderId(data.OrderID);
            window.open(orderUrl, target, rel);
        }
        if (columnObj.clickAction && columnObj.clickAction === 'product') {
            const data = outputRows[row];
            const itemUrl = urlFromASINISBN(data.ASINISBN);
            window.open(itemUrl, target, rel);
        }
        if (columnObj.clickAction && columnObj.clickAction === 'category') {
            const data = outputRows[row];
            const categoryUrl = urlFromCategory(data.Category);
            window.open(categoryUrl, target, rel);
        }


    };

    const headerClicked = (cell) => {
        if (!internalColumns[cell].sortType) {
            return;
        }
        const newSortColumn = internalColumns[cell].source;
        if (sortColumn === newSortColumn) {
           const newSortDirection =  sortDirection === 'ASC' ? 'DESC' : 'ASC';
           setSortDirection(newSortDirection);
        }
        setSortColumn(newSortColumn);
    };

    // not used right now... but maybe later?
    const columnResized = (column,  newSize) => {
        const index = internalColumns.findIndex(columnObj => (columnObj.source === column.source));
        const newColumns = [...internalColumns];
        newColumns[index].width = newSize;
        setInternalColumns(newColumns);
    };

    const getData = ([col, row]) => {
        const columnObj = columns[col];
        const dataSource = columnObj.source;
        const data = outputRows[row][dataSource];

        const outputObj = {
            kind: GridCellKind[columnObj.kind],
            allowOverlay: false,
            allowAdd: false,
            readonly: true,
        };

        if (columnObj.kind === 'Image') {
            const tmpData = imgFromASINISBN(data);
            outputObj.displayData = [tmpData];
            outputObj.data = [tmpData];
        } else { 
            outputObj.displayData = columnObj.formatter ? columnObj.formatter(data) : data;
            outputObj.data = data;
        }

        return outputObj;
    }

    const biggestHeight = (sortedRows.length * 50) + 40;
    const smallestHeight = (sortedRows.length * 50) + 40 < 185 ? (sortedRows.length * 50) + 40 : 185;
    let outputHeight = biggestHeight;
    if (!expanded) {
        outputHeight = smallestHeight;
    }
    const shouldShowExpand = sortedRows.length > 3;

    let tableWidth = 0;
    const maxWidth = window.innerWidth - 60;
    internalColumns.forEach(columnObj => {
        tableWidth = tableWidth + columnObj.width;
    });
    if (tableWidth > maxWidth) {
        tableWidth = maxWidth;
    }
    

    return (
        <div id={uniqueDivId}>
            <DataEditorContainer 
                width={tableWidth} 
                height={outputHeight} 
                style={{border: '1px solid black', marginTop: '1rem'}}
            >
                <DataEditor 
                    getCellContent={getData} 
                    columns={internalColumns} 
                    rows={sortedRows.length} 
                    onCellClicked={cellClicked}
                    onHeaderClicked={headerClicked}
                    trailingRowOptions={false}
                    rowHeight={50}
                    // onColumnResized={columnResized}
                />
            </DataEditorContainer>
            {shouldShowExpand && (
                <div onClick={sizeChangeClick} className={styles.expandContract} style={{width: tableWidth}}>
                    {expanded && (
                        <span>[ &#9650; Contract &#9650; ]</span>
                    )}
                    {!expanded && (
                        <span>[ &#9660; Expand  &#9660; ]</span>
                    )}
                </div>
            )}
        </div>
    );
}
