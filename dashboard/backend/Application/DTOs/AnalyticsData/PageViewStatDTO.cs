namespace Application.DTOs.AnalyticsData
{
    public class PageViewStatDTO
    {
        public required string Url { get; set; }
        public required double LandingCount { get; set; }
        public required double ExitCount { get; set; }
        public required double BounceCount { get; set; }
        public required int Count { get; set; }
        public required double AvgInteractionCount { get; set; }
    }
}