namespace Application.DTOs.AnalyticsData
{
    public class PageViewStatDTO
    {
        public required string Url { get; set; }
        public required int landingCount { get; set; }
        public required int Count { get; set; }
        public required double AvgTimeSpent { get; set; }
    }
}