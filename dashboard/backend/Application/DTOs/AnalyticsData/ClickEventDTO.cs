namespace Application.DTOs.AnalyticsData
{
    public class ClickEventDTO
    {
        public required string ElementId { get; set; }
        public required string ElementText { get; set; }
        public required string ElementType { get; set; }
        public string? Url { get; set; }
        public required int Count { get; set; }
    }
}