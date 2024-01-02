interface BrowserStat {
  name: string;
  count: number;
}

interface ScreenSizeStats {
  lessThan640: number;
  greaterThan640: number;
  greaterThan768: number;
  greaterThan1024: number;
  greaterThan1280: number;
  greaterThan1536: number;
}

interface PageViewStat {
  url: string;
  count: number;
  landingCount: number;
  exitCount: number;
  bounceCount: number;
  avgInteractionCount: number;
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
  seenFirstQuarterCount: number;
  seenQuarterPercentage: number;
  seenHalfPercentage: number;
  seenThreeQuarterPercentage: number;
  seenFullPercentage: number;
}

export interface IAnalyticsData {
  sessionCount: number;
  activeSessionCount: number;
  avgUniquePageVisited: number;
  avgPageVisited: number;
  bounceRate: number;
  isPWAPercentage: number;
  browserStats: BrowserStat[];
  screenSizeStats: ScreenSizeStats;
  pageViewStats: PageViewStat[];
  clickEvents: ClickEvent[];
  videoSessionStats: VideoSessionStat[];
}
