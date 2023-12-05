import HeaderContainer from "@/components/containers/headercontainer";
import TableContainer from "@/components/containers/tablecontainer";
import NavigationLayout from "@/components/layouts/navigation";
import WebsiteConfigLayout from "@/components/layouts/websiteconfig";
import { useWebsite } from "@/services/website/useWebsite";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const { analyticsData } = useWebsite();

  return (
    <div className='grid h-full w-full gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
      <HeaderContainer
        className='col-span-4 row-span-2'
        title='Sessions'
      >
        <TableContainer
          tableheaders={[
            "Total",
            "Avg. pages visited",
            "Avg. time spent (min)",
            "Bounce rate",
          ]}
          tableData={[
            [
              (analyticsData?.sessionCount ?? 0).toString(),
              (analyticsData?.avgPageVisited ?? 0).toString(),
              ((analyticsData?.avgSessionDuration ?? 0) / 60).toFixed(0),
              (analyticsData?.bounceRate ?? 0).toString(),
            ],
          ]}
        />
      </HeaderContainer>

      <HeaderContainer
        className='col-span-4 row-span-4'
        title='Page statistics'
      >
        <TableContainer
          tableheaders={["Page", "Landing", "Leaving", "Visits", "Time spent"]}
          tableData={[
            ["/Home", "2000", "120", "5000", "10:21"],
            ["/dashboard", "1101", "1093", "2320", "00:30"],
          ]}
        />
      </HeaderContainer>

      <HeaderContainer
        className='col-span-1 row-span-2'
        title='Browser'
      >
        <TableContainer
          tableheaders={["Browser", "Total"]}
          tableData={
            analyticsData?.browserStats
              ? analyticsData?.browserStats.map((browser) => [
                  browser.name,
                  browser.count.toString(),
                ])
              : [["", "0"]]
          }
        />
      </HeaderContainer>

      <HeaderContainer
        className='col-span-3 row-span-2'
        title='Screen size'
      >
        <TableContainer
          tableheaders={[
            "< 640",
            "> 640",
            "> 768",
            "> 1024",
            "> 1280",
            "> 1536",
          ]}
          tableData={[
            analyticsData?.screenSizeStats
              ? [
                  analyticsData?.screenSizeStats
                    .filter((screen) => screen.screenSize < 640)
                    .reduce((acc, curr) => acc + curr.count, 0)
                    .toString(),
                  analyticsData?.screenSizeStats
                    .filter(
                      (screen) =>
                        screen.screenSize >= 640 && screen.screenSize < 768,
                    )
                    .reduce((acc, curr) => acc + curr.count, 0)
                    .toString(),
                  analyticsData?.screenSizeStats
                    .filter(
                      (screen) =>
                        screen.screenSize >= 768 && screen.screenSize < 1024,
                    )
                    .reduce((acc, curr) => acc + curr.count, 0)
                    .toString(),
                  analyticsData?.screenSizeStats
                    .filter(
                      (screen) =>
                        screen.screenSize >= 1024 && screen.screenSize < 1280,
                    )
                    .reduce((acc, curr) => acc + curr.count, 0)
                    .toString(),
                  analyticsData?.screenSizeStats
                    .filter(
                      (screen) =>
                        screen.screenSize >= 1280 && screen.screenSize < 1536,
                    )
                    .reduce((acc, curr) => acc + curr.count, 0)
                    .toString(),
                  analyticsData?.screenSizeStats
                    .filter((screen) => screen.screenSize >= 1536)
                    .reduce((acc, curr) => acc + curr.count, 0)
                    .toString(),
                ]
              : ["0", "0", "0", "0", "0", "0"],
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
