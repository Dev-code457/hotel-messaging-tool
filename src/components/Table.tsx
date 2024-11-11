import React from "react";

interface TableProps {
  csvData: any[];
}

const Table: React.FC<TableProps> = ({ csvData }) => {
  if (csvData.length === 0) {
    return <p>No data available</p>;
  }

  const headers = Object.keys(csvData[0]);

  return (
    <div className="overflow-auto max-h-[500px] w-full">
      <table className="min-w-full bg-gray-100 border border-gray-300">
        <thead className="sticky top-0 bg-gray-200">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-2 border bg-gray-200 text-black font-bold text-left text-sm"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-2 border text-sm text-black"
                >
                  {row[header]}
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
