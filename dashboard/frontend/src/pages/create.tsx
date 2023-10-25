import NavigationLayout from '@/components/layouts/navigation';
import CreateWebsiteButton from '@/components/website/createwebsitebutton';
import CreateWebsiteForm from '@/components/website/createwebsiteform';
import WebsiteCard from '@/components/website/websitecard';
import { ReactElement, useState } from 'react';
import { NextPageWithLayout } from './_app';
import Grid from '@/components/layouts/grid';

const Create: NextPageWithLayout = () => {
  const [createWebsiteVisible, setCreateWebsiteVisible] =
    useState<boolean>(false);

  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-6'>
      <h1 className='w-full text-start text-4xl'>Your websites</h1>
      <Grid>
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
        {createWebsiteVisible ? (
          <CreateWebsiteForm
            isVisible={createWebsiteVisible}
            onHide={() => setCreateWebsiteVisible(false)}
            onSubmit={() => {}}
          />
        ) : (
          <CreateWebsiteButton onClick={() => setCreateWebsiteVisible(true)} />
        )}
      </Grid>
    </div>
  );
};

Create.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default Create;
