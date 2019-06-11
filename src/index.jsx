import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "react-js-pagination";
import { getDataWithinIndexRange } from "./Utils/rows";
import { getRows } from "./Components/rows";
import { getHeaders } from "./Components/header";

const Table = props => {
    const [activePage, setActivePage] = useState(0);
    const itemsPerPage = props.options.itemsPerPage || 10;
    const originalRows = getRows(props.colDef, props.rowData, props.options);
    const [rows, setRows] = useState(
        getDataWithinIndexRange(0, itemsPerPage, originalRows)
    );

    const changePageWithData = (pageId = 1) => {
        const newRows = getDataWithinIndexRange(
            (pageId - 1) * itemsPerPage,
            pageId * itemsPerPage,
            originalRows
        );
        setRows(newRows);
        setActivePage(newRows.length > itemsPerPage ? pageId - 1 : 0);
    };

    return (
        <section className="panel panel-info">
            <div className="panel-heading">{props.header}</div>
            <div className="panel-body table-responsive">
                <table className="table table-bordered" id={props.header}>
                    <thead>
                        <tr>{getHeaders(props.colDef, props.options)}</tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
                {originalRows.length > itemsPerPage ? (
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={originalRows.length}
                        onChange={changePageWithData}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                ) : null}
            </div>
        </section>
    );
};

export { Table };
