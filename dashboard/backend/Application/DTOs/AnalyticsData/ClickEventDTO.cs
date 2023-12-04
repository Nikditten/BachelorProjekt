namespace Application.DTOs.AnalyticsData
{
    public class ClickEventDTO
    {
        public required string ElementId { get; set; }
        public required string ElementText { get; set; }
        public required string ElementValue { get; set; }
        public required int ClickCount { get; set; }
    }
}