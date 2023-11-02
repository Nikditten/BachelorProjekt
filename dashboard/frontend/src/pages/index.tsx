import HeaderContainer from '@/components/containers/headercontainer';
import TableContainer from '@/components/containers/tablecontainer';
import NavigationLayout from '@/components/layouts/navigation';
import WebsiteConfigLayout from '@/components/layouts/websiteconfig';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    <div className='h-full w-full grid gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
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
            'Bounce rate',
          ]}
          tableData={[['10.000', '2342', '12', '10:00', '1212']]}
        />
      </HeaderContainer>

      <HeaderContainer
        className='col-span-4 row-span-4'
        title='Page statistics'
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
        className='col-span-2 row-span-2'
        title='Bounce rate per page'
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
        className='col-span-1 row-span-2'
        title='Browser'
      >
        <TableContainer
          tableheaders={['Browser', 'Total']}
          tableData={[
            ['Chrome', '23.232'],
            ['Safari', '10.000'],
            ['Firefox', '12.121'],
          ]}
        />
      </HeaderContainer>

      <HeaderContainer
        className='col-span-1 row-span-2'
        title='Operating system'
      >
        <TableContainer
          tableheaders={['System', 'Total']}
          tableData={[
            ['Windows', '1212'],
            ['Mac', '2321'],
            ['iOS', '1213'],
          ]}
        />
      </HeaderContainer>

      <HeaderContainer
        className='col-span-2 row-span-2'
        title='Screen size'
      >
        <TableContainer
          tableheaders={['< 600', '< 768', '< 992', '< 1200', '> 1200']}
          tableData={[['12', '1212', '121', '232', '232']]}
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
