import HeaderContainer from "@/components/containers/headercontainer";
import TableContainer from "@/components/containers/tablecontainer";
import NavigationLayout from "@/components/layouts/navigation";
import WebsiteConfigLayout from "@/components/layouts/websiteconfig";
import { useWebsite } from "@/services/website/useWebsite";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const { analyticsData } = useWebsite();

  const formatTime = (seconds: number): string => {
    var hours = Math.floor(seconds / 3600).toString();
    var minutes = Math.floor((seconds % 3600) / 60).toString();
    var sec = Math.floor(seconds % 60).toString();

    if (hours.length === 1) hours = `0${hours}`;
    if (minutes.length === 1) minutes = `0${minutes}`;
    if (sec.length === 1) sec = `0${sec}`;

    return `${hours}:${minutes}:${sec}`;
  };

  const cleanUrl = (url: string) => {
    try {
      const urlObject = new URL(url);
      return urlObject.pathname;
    } catch (error) {
      return url;
    }
  };

  return (
    <div className='grid h-5/6 w-full gap-8 md:grid-cols-2 lg:h-full xl:grid-cols-3 2xl:grid-cols-4'>
      <HeaderContainer
        className='col-span-4 row-span-2'
        title='Sessions'
      >
        <TableContainer
          tableheaders={[
            "Total",
            "Active sessions",
            "Avg. pages visited",
            "Avg. time spent",
            "Bounce rate",
            "PWA visits",
          ]}
          tableData={[
            [
              (analyticsData?.sessionCount ?? 0).toString(),
              (analyticsData?.activeSessionCount ?? 0).toString(),
              (analyticsData?.avgPageVisited.toFixed(2) ?? 0).toString(),
              formatTime(analyticsData?.avgSessionDuration ?? 0),
              `${analyticsData?.bounceRate.toFixed(2) ?? 0}%`,
              `${analyticsData?.isPWAPercentage.toFixed(2) ?? 0}%`,
            ],
          ]}
        />
      </HeaderContainer>

      <HeaderContainer
        className='col-span-4 row-span-4'
        title='Page statistics'
      >
        <TableContainer
          tableheaders={[
            "Page",
            "Landing",
            "Exit",
            "Bounce",
            "Visits",
            "AVG. Time spent",
          ]}
          tableData={analyticsData?.pageViewStats
            .sort((a, b) => b.count - a.count)
            .map((page) => [
              cleanUrl(page.url),
              `${page.landingCount}`,
              `${page.exitCount}`,
              `${page.bounceCount}`,
              `${page.count}`,
              formatTime(page.avgTimeSpent),
            ])}
        />
      </HeaderContainer>

      <HeaderContainer
        className='col-span-4 row-span-4'
        title='Video statistics'
      >
        <TableContainer
          tableheaders={[
            "Video",
            "Source",
            "Started",
            "< 25%",
            "> 25%",
            "> 50%",
            "> 75%",
            "100%",
          ]}
          tableData={analyticsData?.videoSessionStats
            .sort((a, b) => b.startedCount - a.startedCount)
            .map((video) => [
              video.id,
              video.source,
              `${video.startedCount}`,
              `${video.seenFirstQuarterCount.toFixed(2)}%`,
              `${video.seenQuarterPercentage.toFixed(2)}%`,
              `${video.seenHalfPercentage.toFixed(2)}%`,
              `${video.seenThreeQuarterPercentage.toFixed(2)}%`,
              `${video.seenFullPercentage.toFixed(2)}%`,
            ])}
        />
      </HeaderContainer>

      <HeaderContainer
        className='col-span-4 row-span-4'
        title='Click events'
      >
        <TableContainer
          tableheaders={["ButtonId", "Text", "Type", "URL", "Click"]}
          tableData={analyticsData?.clickEvents
            .sort((a, b) => b.count - a.count)
            .map((click) => [
              click.elementId,
              click.elementText,
              click.elementType,
              click.url,
              `${click.count}`,
            ])}
        />
      </HeaderContainer>

      <HeaderContainer
        className='col-span-1 row-span-2'
        title='Browser'
      >
        <TableContainer
          tableheaders={["Browser", "Total"]}
          tableData={analyticsData?.browserStats
            .sort((a, b) => b.count - a.count)
            .map((browser) => [browser.name, browser.count.toString()])}
        />
      </HeaderContainer>

      <HeaderContainer
        className='col-span-3 row-span-2'
        title='Screen size'
      >
        <TableContainer
          tableheaders={[
            "< 640px",
            "> 640px",
            "> 768px",
            "> 1024px",
            "> 1280px",
            "> 1536px",
          ]}
          tableData={[
            [
              `${
                analyticsData?.screenSizeStats.lessThan640.toFixed(2) ?? 0.0
              }%`,
              `${
                analyticsData?.screenSizeStats.greaterThan640.toFixed(2) ?? 0.0
              }%`,
              `${
                analyticsData?.screenSizeStats.greaterThan768.toFixed(2) ?? 0.0
              }%`,
              `${
                analyticsData?.screenSizeStats.greaterThan1024.toFixed(2) ?? 0.0
              }%`,
              `${
                analyticsData?.screenSizeStats.greaterThan1280.toFixed(2) ?? 0.0
              }%`,
              `${
                analyticsData?.screenSizeStats.greaterThan1536.toFixed(2) ?? 0.0
              }%`,
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
