import { FC, PropsWithChildren } from 'react';
import NavigationBar from '../navigationbar/navigationbar';

const NavigationLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex flex-col items-center justify-start w-screen h-screen p-4 gap-4 md:flex-row'>
      <NavigationBar />
      <main className='w-full h-full p-6'>{children}</main>
    </div>
  );
};

export default NavigationLayout;
