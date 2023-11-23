import Grid from "@/components/layouts/grid";
import NavigationLayout from "@/components/layouts/navigation";
import CreateWebsiteButton from "@/components/website/createwebsitebutton";
import CreateWebsiteForm from "@/components/website/createwebsiteform";
import WebsiteCard from "@/components/website/websitecard";
import { useWebsite } from "@/services/website/useWebsite";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "./_app";

const Create: NextPageWithLayout = () => {
  const { websites, deleteWebsiteById, createNewWebsite, updateWebsiteById } =
    useWebsite();

  // SOURCE: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

  const [createWebsiteVisible, setCreateWebsiteVisible] =
    useState<boolean>(false);

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-6'>
      <h1 className='w-full text-start text-4xl'>Manage websites</h1>
      <Grid>
        {websites.map((website) => (
          <WebsiteCard
            key={website.id}
            website={website}
            onUpdate={(name, url) => updateWebsiteById(website.id, name, url)}
            onCopy={() => copyToClipboard(website.id)}
            onDelete={() => deleteWebsiteById(website.id)}
          />
        ))}
        {createWebsiteVisible ? (
          <CreateWebsiteForm
            onHide={() => setCreateWebsiteVisible(false)}
            onSubmit={(name, url) => createNewWebsite(name, url)}
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
