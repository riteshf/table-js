import React from "react";

const getSortableView = () => {};

const applyOtherHeaderOptions = (options, shouldSortBy, sortingOrder) => {
    const sortable = options.sortable;

    return <>{sortable ? getSortableView(shouldSortBy, sortingOrder) : null}</>;
};

const getHeaders = (colDef, options) => {
    return colDef.map((header, key) => {
        return (
            <th key={key} style={header.style || {}}>
                {header.name}
                {applyOtherHeaderOptions(
                    header.options,
                    header.name === options.sortBy,
                    options.sortingOrder
                )}
            </th>
        );
    });
};

export { getHeaders };
