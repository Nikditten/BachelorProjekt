namespace Application.DTOs.AnalyticsData
{
    public class ClickEventDTO
    {
        public required string Id { get; set; }
        public required string Text { get; set; }
        public required string Value { get; set; }
        public required int Count { get; set; }
    }
}