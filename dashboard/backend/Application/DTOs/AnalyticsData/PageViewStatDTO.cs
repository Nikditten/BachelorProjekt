namespace Application.DTOs.AnalyticsData
{
    public class PageViewStatDTO
    {
        public required string Url { get; set; }
        public required int LandingCount { get; set; }
        public required int ExitCount { get; set; }
        public required int BounceCount { get; set; }
        public required int Count { get; set; }
        public required double AvgTimeSpent { get; set; }
    }
}