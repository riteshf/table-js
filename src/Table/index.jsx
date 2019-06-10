import React, { useState } from "react";
import { getDataWithinIndexRange, filterRows } from "../Utils/rows";
import Pagination from "react-js-pagination";

const getHeaders = colDef => {
    return colDef.map((header, key) => {
        return (
            <th key={key} style={header.style || {}}>
                {header.name}
            </th>
        );
    });
};

const getRows = (colDef, rowData, options) => {
    const rows = options ? filterRows(colDef, rowData, options) : rowData;
    return rows.map((row, key) => (
        <tr key={key}>
            {colDef.map((header, key) => (
                <td key={key} style={header.style || {}}>
                    {header.Cell ? header.Cell(row) : row[header.fieldName]}
                </td>
            ))}
        </tr>
    ));
};

function Table(props) {
    const [activePage, setActivePage] = useState(0);
    const itemsPerPage = props.itemsPerPage || 10;
    const originalRows = getRows(props.colDef, props.rowData, props.options);
    const [rows, setRows] = useState(
        getDataWithinIndexRange(0, itemsPerPage, originalRows)
    );

    const pageChanged = (pageId = 1) => {
        const newRows = getDataWithinIndexRange(
            (pageId - 1) * itemsPerPage,
            pageId * itemsPerPage,
            originalRows
        );
        console.log(newRows);
        setRows(newRows);
        console.log(pageId, activePage)
        setActivePage(newRows.length > itemsPerPage ? pageId-1 : 0);
    };

    return (
        <section className="panel panel-info">
            <div className="panel-heading">{props.header}</div>
            <div className="panel-body table-responsive">
                <table className="table table-bordered" id={props.header}>
                    <thead>
                        <tr>{getHeaders(props.colDef)}</tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
                {originalRows.length > itemsPerPage ? (
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={originalRows.length}
                        onChange={pageChanged}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                ) : null}
            </div>
        </section>
    );
}

export default Table;
