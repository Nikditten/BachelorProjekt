import HeaderContainer from "@/components/containers/headercontainer";
import TableContainer from "@/components/containers/tablecontainer";
import NavigationLayout from "@/components/layouts/navigation";
import WebsiteConfigLayout from "@/components/layouts/websiteconfig";
import { useWebsite } from "@/services/website/useWebsite";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const { analyticsData } = useWebsite();

  const getCountByScreenSize = (
    validation: (screen: number) => boolean,
  ): string => {
    if (!analyticsData?.screenSizeStats) return "0";
    return (
      analyticsData?.screenSizeStats
        .filter((screen) => validation(screen.screenSize))
        .reduce((acc, curr) => acc + curr.count, 0)
        .toString() ?? "0"
    );
  };

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
            "Avg. time spent",
            "Bounce rate",
            "PWA visits",
          ]}
          tableData={[
            [
              (analyticsData?.sessionCount ?? 0).toString(),
              (analyticsData?.avgPageVisited ?? 0).toString(),
              `${((analyticsData?.avgSessionDuration ?? 0) / 60).toFixed(
                0,
              )} min.`,
              `${analyticsData?.bounceRate ?? 0}%`,
              `${analyticsData?.isPWAPercentage ?? 0}%`,
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
            [
              getCountByScreenSize((screen) => screen < 640),
              getCountByScreenSize((screen) => screen >= 640 && screen < 768),
              getCountByScreenSize((screen) => screen >= 768 && screen < 1024),
              getCountByScreenSize((screen) => screen >= 1024 && screen < 1280),
              getCountByScreenSize((screen) => screen >= 1280 && screen < 1536),
              getCountByScreenSize((screen) => screen >= 1536),
            ],
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
