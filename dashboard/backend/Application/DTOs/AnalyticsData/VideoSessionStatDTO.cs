namespace Application.DTOs.AnalyticsData
{
    public class VideoSessionStatDTO
    {
        public required string Id { get; set; }
        public required string Source { get; set; }
        public required int StartedCount { get; set; }
        public required double SeenFirstQuarterCount { get; set; }
        public required double SeenQuarterPercentage { get; set; }
        public required double SeenHalfPercentage { get; set; }
        public required double SeenThreeQuarterPercentage { get; set; }
        public required double SeenFullPercentage { get; set; }
    }
}