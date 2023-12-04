namespace Application.DTOs.AnalyticsData
{
    public class PageViewStatDTO
    {
        public required string PageUrl { get; set; }
        public required int ViewCount { get; set; }
        public required double AvgTimeSpent { get; set; }
    }
}