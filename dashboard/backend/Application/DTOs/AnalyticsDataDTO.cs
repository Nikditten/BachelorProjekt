using Application.DTOs.AnalyticsData;

namespace Application.DTOs
{
    public class AnalyticsDataDTO
    {
        public required int SessionCount { get; set; }
        public required double AvgPageVisited { get; set; }
        public required double AvgSessionDuration { get; set; }
        public required double BounceRate { get; set; }
        public required double IsPWAPercentage { get; set; }
        public required List<BrowserStatDTO> browserStats { get; set; }
        public required List<ScreenSizeStatDTO> screenSizeStats { get; set; }
        public required List<PageViewStatDTO> pageViewStats { get; set; }
        public required List<ClickEventDTO> clickEvents { get; set; }
        public required List<VideoSessionStatDTO> videoSessionStats { get; set; }
    }
}