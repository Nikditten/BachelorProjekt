import { FC } from 'react';

interface Props {
  title: string;
  value: number;
}

const Stat: FC<Props> = ({ title, value }) => {
  return (
    <li className='flex flex-row justify-between items-center even:bg-slate-50 p-4 rounded-lg'>
      <span>{title}</span>
      <span>{value}</span>
    </li>
  );
};

export default Stat;
