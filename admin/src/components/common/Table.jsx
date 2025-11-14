import './Table.css';

const Table = ({
    columns,
    data,
    loading = false,
    emptyMessage = 'No data available'
}) => {
    if (loading) {
        return (
            <div className="table-container">
                <div className="table-loading">Loading...</div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="table-container">
                <div className="table-empty">{emptyMessage}</div>
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} style={{ width: column.width }}>
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>
                                    {column.render ? column.render(row) : row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
