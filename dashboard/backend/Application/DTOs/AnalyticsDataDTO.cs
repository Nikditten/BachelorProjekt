using Application.DTOs.AnalyticsData;
using Domain.Entities;
using Domain.Enums;

namespace Application.DTOs
{
    public class AnalyticsDataDTO
    {
        public AnalyticsDataDTO(List<Session> sessions)
        {
            _sessions = sessions.Where(x => x.EndedAt != null).ToList();
            ActiveSessionCount = sessions.Count(x => x.EndedAt == null);
        }
        private ICollection<Session> _sessions { init; get; }
        public int SessionCount
        {
            get
            {
                return _sessions.Count(x => x.EndedAt != null);
            }
        }
        public int ActiveSessionCount
        {
            init; get;
        }
        public double AvgPageVisited
        {
            get
            {
                if (_sessions.Count == 0) return 0;
                return _sessions.Average(x => x.NavigationEvents?.Select(y => y.URL).Distinct().Count() ?? 0);
            }
        }
        public double AvgSessionDuration
        {
            get
            {
                if (_sessions.Count == 0) return 0;
                return _sessions.Average(x => (x.EndedAt - x.CreatedAt)?.TotalSeconds ?? 0);
            }
        }
        public double BounceRate
        {
            get
            {
                if (_sessions.Count == 0) return 0;
                return _sessions.Average(x => x.NavigationEvents?.Count == 0 ? 1 : 0) * 100;
            }
        }
        public double IsPWAPercentage
        {
            get
            {
                if (_sessions.Count == 0) return 0;
                return _sessions.Average(x => x.IsPWA ? 1 : 0) * 100;
            }
        }
        public List<BrowserStatDTO> browserStats
        {
            get
            {
                return _sessions.GroupBy(x => x.Browser).Select(x => new BrowserStatDTO { Name = x.Key, Count = x.Count() }).ToList();
            }
        }
        public ScreenSizeStatsDTO screenSizeStats
        {
            get
            {
                if (_sessions.Count == 0) return new ScreenSizeStatsDTO()
                {
                    lessThan640 = 0,
                    greaterThan640 = 0,
                    greaterThan768 = 0,
                    greaterThan1024 = 0,
                    greaterThan1280 = 0,
                    greaterThan1536 = 0,

                };
                return new ScreenSizeStatsDTO
                {
                    lessThan640 = _sessions.Average(x => x.DeviceWidth < 640 ? 1 : 0) * 100,
                    greaterThan640 = _sessions.Average(x => x.DeviceWidth >= 640 && x.DeviceWidth < 768 ? 1 : 0) * 100,
                    greaterThan768 = _sessions.Average(x => x.DeviceWidth >= 768 && x.DeviceWidth < 1024 ? 1 : 0) * 100,
                    greaterThan1024 = _sessions.Average(x => x.DeviceWidth >= 1024 && x.DeviceWidth < 1280 ? 1 : 0) * 100,
                    greaterThan1280 = _sessions.Average(x => x.DeviceWidth >= 1280 && x.DeviceWidth < 1536 ? 1 : 0) * 100,
                    greaterThan1536 = _sessions.Average(x => x.DeviceWidth >= 1536 ? 1 : 0) * 100,
                };
            }
        }
        public List<PageViewStatDTO> pageViewStats
        {
            get
            {
                return _sessions
                .SelectMany(x => x.NavigationEvents)
                .GroupBy(x => x.URL)
                .Select(x => new PageViewStatDTO
                {
                    Url = x.Key,
                    Count = x.Count(),
                    LandingCount = x.Count(y => y.Type == NavigationType.Landing),
                    ExitCount = x.Count(y => y.Type == NavigationType.Leaving || (y.Type == NavigationType.Landing && y.Session.NavigationEvents.Count == 1)),
                    BounceCount = x.Count(y => y.Type == NavigationType.Landing && y.Session.NavigationEvents.Count == 1),
                    AvgTimeSpent = x.Average(y =>
                    {
                        NavigationEvent? nextNavigationEvent = y.Session.NavigationEvents.OrderBy(z => z.Index).FirstOrDefault(z => z.Index > y.Index);
                        if (nextNavigationEvent == null) return (y.Session.EndedAt - y.CreatedAt)?.TotalSeconds ?? 0;
                        return (nextNavigationEvent.CreatedAt - y.CreatedAt).TotalSeconds;

                    })
                })
                .ToList();
            }
        }
        public List<ClickEventDTO> clickEvents
        {
            get
            {
                ICollection<ClickEvent>? clickEvents = _sessions.SelectMany(x => x.ClickEvents).ToList();
                if (clickEvents == null) return new List<ClickEventDTO>();
                return clickEvents
                .GroupBy(x => (x.ElementID, x.ElementText, x.ElementType))
                .Select(
                    x =>
                    {
                        ClickEvent clickEvent = x.First();
                        return new ClickEventDTO
                        {
                            ElementId = clickEvent.ElementID,
                            ElementText = clickEvent.ElementText,
                            ElementType = clickEvent.ElementType,
                            Url = clickEvent.URL,
                            Count = x.Count()
                        };
                    }
                ).ToList();
            }
        }
        public List<VideoSessionStatDTO> videoSessionStats
        {
            get
            {
                ICollection<VideoSession>? videoSessions = _sessions.SelectMany(x => x.VideoSessions).ToList();
                if (videoSessions == null) return new List<VideoSessionStatDTO>();
                return videoSessions
                .GroupBy(x => (x.VideoId, x.Source))
                .Select(
                    x =>
                    {
                        ICollection<VideoSession> vsessions = videoSessions.Where(y => x.Key.VideoId == y.VideoId && x.Key.Source == y.Source).ToList();
                        return new VideoSessionStatDTO
                        {
                            Id = x.Key.VideoId,
                            Source = x.Key.Source,
                            StartedCount = vsessions.Count,
                            SeenFirstQuarterCount = vsessions.Average(y => (y.VideoEvents?.OrderBy(z => z.Type).LastOrDefault()?.Duration ?? 0) < y.Duration * 0.25 ? 1 : 0) * 100,
                            SeenQuarterPercentage = vsessions.Average(y => (y.VideoEvents?.OrderBy(z => z.Type).LastOrDefault()?.Duration ?? 0) >= y.Duration * 0.25 && (y.VideoEvents?.OrderBy(z => z.Type).LastOrDefault()?.Duration ?? 0) < y.Duration * 0.5 ? 1 : 0) * 100,
                            SeenHalfPercentage = vsessions.Average(y => (y.VideoEvents?.OrderBy(z => z.Type).LastOrDefault()?.Duration ?? 0) >= y.Duration * 0.5 && (y.VideoEvents?.OrderBy(z => z.Type).LastOrDefault()?.Duration ?? 0) < y.Duration * 0.75 ? 1 : 0) * 100,
                            SeenThreeQuarterPercentage = vsessions.Average(y => (y.VideoEvents?.OrderBy(z => z.Type).LastOrDefault()?.Duration ?? 0) >= y.Duration * 0.75 && (y.VideoEvents?.OrderBy(z => z.Type).LastOrDefault()?.Duration ?? 0) < y.Duration ? 1 : 0) * 100,
                            SeenFullPercentage = vsessions.Average(y => (y.VideoEvents?.OrderBy(z => z.Type).LastOrDefault()?.Duration ?? 0) == y.Duration || (y.VideoEvents?.OrderBy(z => z.Type).LastOrDefault()?.Type ?? 0) == VideoEventType.End ? 1 : 0) * 100,
                        };

                    }
                ).ToList();

            }
        }
    }
}