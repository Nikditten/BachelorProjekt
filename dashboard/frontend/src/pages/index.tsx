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

  const getCountByScreenSize = (
    validation: (screen: number) => boolean,
  ): number => {
    if (!analyticsData?.screenSizeStats) return 0;
    const total = analyticsData?.screenSizeStats.reduce(
      (acc, curr) => acc + curr.count,
      0,
    );

    const count = analyticsData?.screenSizeStats
      .filter((screen) => validation(screen.screenSize))
      .reduce((acc, curr) => acc + curr.count, 0);

    return (count / total) * 100;
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
              formatTime(analyticsData?.avgSessionDuration ?? 0),
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
          tableheaders={["Page", "Landing", "Visits", "Time spent"]}
          tableData={
            analyticsData?.pageViewStats
              .sort((a, b) => a.count - b.count)
              .map((page) => [
                cleanUrl(page.url),
                `${page.landingCount}`,
                `${page.count}`,
                formatTime(page.avgTimeSpent),
              ]) ?? [["", "0", "0", "0"]]
          }
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
            "25%",
            "50%",
            "75%",
            "100%",
          ]}
          tableData={
            analyticsData?.videoSessionStats
              .sort((a, b) => b.startedCount - a.startedCount)
              .map((video) => [
                video.id,
                video.source,
                `${video.startedCount}`,
                `${video.seenQuarterPercentage}%`,
                `${video.seenHalfPercentage}%`,
                `${video.seenThreeQuarterPercentage}%`,
                `${video.seenFullPercentage}%`,
              ]) ?? [["", "", "0", "0", "0", "0", "0"]]
          }
        />
      </HeaderContainer>

      <HeaderContainer
        className='col-span-4 row-span-4'
        title='Click events'
      >
        <TableContainer
          tableheaders={["ButtonId", "Text", "Type", "URL", "Click"]}
          tableData={
            analyticsData?.clickEvents
              .sort((a, b) => b.count - a.count)
              .map((click) => [
                click.elementId,
                click.elementText,
                click.elementType,
                click.url,
                `${click.count}`,
              ]) ?? [["", "", "", "", "0"]]
          }
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
              `${getCountByScreenSize((screen) => screen < 640)}%`,
              `${getCountByScreenSize(
                (screen) => screen >= 640 && screen < 768,
              )}%`,
              `${getCountByScreenSize(
                (screen) => screen >= 768 && screen < 1024,
              )}%`,
              `${getCountByScreenSize(
                (screen) => screen >= 1024 && screen < 1280,
              )}%`,
              `${getCountByScreenSize(
                (screen) => screen >= 1280 && screen < 1536,
              )}%`,
              `${getCountByScreenSize((screen) => screen >= 1536)}%`,
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
