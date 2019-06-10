const sortData = (data, fieldName, order) => {
    if (!fieldName) return data;

}

const filterRows = (colDef, rowData, options) => {
    const rows = sortData(
        rowData,
        colDef.reduce(
            (column, crrCol) =>
                (column =
                    options.sortBy === crrCol.name ? crrCol.fieldName : column),
            ""
        ),
        options.sortingOrder
    );
    return rows;
};


const getDataWithinIndexRange = (from, to, data) =>
    data && data.filter((row, index) => index >= from && index < to);


export { getDataWithinIndexRange, filterRows };