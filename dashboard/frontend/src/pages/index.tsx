import HeaderContainer from '@/components/containers/headercontainer';
import TableContainer from '@/components/containers/tablecontainer';
import NavigationLayout from '@/components/layouts/navigation';
import WebsiteConfigLayout from '@/components/layouts/websiteconfig';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    <div className='h-full w-full grid gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:grid-rows-5'>
      <HeaderContainer
        className='col-span-4 row-span-2'
        title='Sessions'
      >
        <TableContainer
          tableheaders={[
            'Total',
            'Unique',
            'Avg. pages visited',
            'Avg. time spent',
          ]}
          tableData={[['10.000', '2342', '12', '10:00']]}
        />
      </HeaderContainer>

      <HeaderContainer
        className='col-span-2 row-span-4'
        title='General'
      >
        <TableContainer
          tableheaders={['Page', 'Landing', 'Leaving', 'Visits', 'Time spent']}
          tableData={[
            ['/Home', '2000', '120', '5000', '10:21'],
            ['/dashboard', '1101', '1093', '2320', '00:30'],
          ]}
        />
      </HeaderContainer>

      <HeaderContainer
        className='col-span-2 row-span-4'
        title='Bounce rates'
      >
        <TableContainer
          tableheaders={['Page', 'Total']}
          tableData={[
            ['/Home', '2342'],
            ['/dashboard', '1123'],
          ]}
        />
      </HeaderContainer>

      <HeaderContainer
        className='col-span-2 row-span-2'
        title='Referrer'
      >
        <TableContainer
          tableheaders={['URL', 'Total']}
          tableData={[
            ['www.google.com', '10'],
            ['www.youtube.com', '9'],
            ['www.linkedin.com', '8'],
          ]}
        />
      </HeaderContainer>

      <HeaderContainer
        className='col-span-2 row-span-2'
        title='Browser'
      >
        <TableContainer
          tableheaders={['Browser', 'Total']}
          tableData={[
            ['Chrome', '23.232'],
            ['iOS', '10.000'],
          ]}
        />
      </HeaderContainer>
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
