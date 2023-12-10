import { FC } from 'react';

interface Props {
  tableheaders: string[];
  tableData: string[][];
  className?: string;
}

const TableContainer: FC<Props> = ({ tableheaders, tableData, className }) => {
  return (
    <div className={`h-full w-full overflow-auto ${className}`}>
      <table className='w-full table-auto text-sm text-left text-gray-500 border'>
        <thead className='text-xs uppercase bg-black text-white'>
          <tr>
            {tableheaders.map((header, index) => {
              return (
                <th
                  key={index}
                  className='p-6 whitespace-nowrap'
                >
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => {
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
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableContainer;
