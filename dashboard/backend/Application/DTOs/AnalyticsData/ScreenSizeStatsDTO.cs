namespace Application.DTOs.AnalyticsData
{
    public class ScreenSizeStatsDTO
    {
        public required double lessThan640 { get; set; }
        public required double greaterThan640 { get; set; }
        public required double greaterThan768 { get; set; }
        public required double greaterThan1024 { get; set; }
        public required double greaterThan1280 { get; set; }
        public required double greaterThan1536 { get; set; }
    }
}