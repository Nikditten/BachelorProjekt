import NavigationLayout from '@/components/layouts/navigation';
import WebsiteConfigLayout from '@/components/layouts/websiteconfig';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      INDEX
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <WebsiteConfigLayout>{page}</WebsiteConfigLayout>
    </NavigationLayout>
  );
};

export default Home;
