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
  landingCount: number;
  avgTimeSpent: number;
}

interface ClickEvent {
  elementId: string;
  elementText: string;
  elementType: string;
  url: string;
  count: number;
}

interface VideoSessionStat {
  id: string;
  source: string;
  startedCount: number;
  seenQuarterPercentage: number;
  seenHalfPercentage: number;
  seenThreeQuarterPercentage: number;
  seenFullPercentage: number;
}

export interface IAnalyticsData {
  sessionCount: number;
  avgPageVisited: number;
  avgSessionDuration: number;
  bounceRate: number;
  isPWAPercentage: number;
  browserStats: BrowserStat[];
  screenSizeStats: ScreenSizeStat[];
  pageViewStats: PageViewStat[];
  clickEvents: ClickEvent[];
  videoSessionStats: VideoSessionStat[];
}
