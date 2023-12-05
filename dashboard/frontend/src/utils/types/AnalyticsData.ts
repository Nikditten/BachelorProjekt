interface BrowserStat {
  name: string;
  count: number;
}

interface ScreenSizeStat {
  screenSize: number;
  count: number;
}

interface PageViewStat {
  url: string;
  count: number;
  avgTimeSpent: number;
}

interface ClickEvent {
  id: string;
  text: string;
  value: string;
  count: number;
}

interface VideoSessionStat {
  id: string;
  source: string;
  startedCount: number;
  seenQuaterPercentage: number;
  seenHalfPercentage: number;
  seenThreeQuaterPercentage: number;
  seenFullPercentage: number;
}

export interface IAnalyticsData {
  sessionCount: number;
  avgPageVisited: number;
  avgSessionDuration: number;
  bounceRate: number;
  isPWA: number;
  browserStats: BrowserStat[];
  screenSizeStats: ScreenSizeStat[];
  pageViewStats: PageViewStat[];
  clickEvents: ClickEvent[];
  videoSessionStats: VideoSessionStat[];
}
