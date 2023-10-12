import NavigationLayout from '@/components/layouts/navigation';
import CreateWebsiteButton from '@/components/website/createwebsitebutton';
import WebsiteCard from '@/components/website/websitecard';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const Create: NextPageWithLayout = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-6'>
      <h1 className='w-full text-start text-4xl'>Your websites</h1>
      <div className='h-full w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 grid-rows-4'>
        <WebsiteCard
          title='Test website 2'
          id='1218e7yh237r28320ur32'
        />
        <WebsiteCard
          title='Test website 2'
          id='1218e7yh237r28320ur32'
        />
        <WebsiteCard
          title='Test website 2'
          id='1218e7yh237r28320ur32'
        />
        <WebsiteCard
          title='Test website 2'
          id='1218e7yh237r28320ur32'
        />
        <WebsiteCard
          title='Test website 2'
          id='1218e7yh237r28320ur32'
        />
        <CreateWebsiteButton onClick={() => {}} />
      </div>
    </div>
  );
};

Create.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default Create;
