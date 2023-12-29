import { FC } from "react";

interface Props {
  tableheaders: string[];
  tableData?: string[][];
  className?: string;
}

const TableContainer: FC<Props> = ({ tableheaders, tableData, className }) => {
  return (
    <div className={`h-full w-full overflow-auto ${className}`}>
      <table className='w-full table-auto border text-left text-sm text-gray-500'>
        <thead className='bg-black text-xs uppercase text-white'>
          <tr>
            {tableheaders.map((header, index) => {
              return (
                <th
                  key={index}
                  className='whitespace-nowrap p-6'
                >
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tableData != undefined && tableData?.length > 0 ? (
            tableData!.map((row, index) => {
              return (
                <tr
                  key={index}
                  className='border-b last:border-b-0 even:bg-slate-100'
                >
                  {row.map((column, index) => {
                    return (
                      <td
                        key={index}
                        className='p-6'
                      >
                        {column}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr className='border-b-0'>
              <td
                className='p-6 text-start'
                colSpan={tableheaders.length}
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableContainer;
