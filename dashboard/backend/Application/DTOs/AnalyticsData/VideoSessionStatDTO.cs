namespace Application.DTOs.AnalyticsData
{
    public class VideoSessionStatDTO
    {
        public required string Id { get; set; }
        public required string Source { get; set; }
        public required int StartedCount { get; set; }
        public required int SeenQuarterPercentage { get; set; }
        public required int SeenHalfPercentage { get; set; }
        public required int SeenThreeQuarterPercentage { get; set; }
        public required int SeenFullPercentage { get; set; }
    }
}