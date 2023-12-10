using Application.DTOs.AnalyticsData;
using Domain.Entities;
using Domain.Enums;

namespace Application.DTOs
{
    public class AnalyticsDataDTO
    {
        public AnalyticsDataDTO(List<Session> sessions)
        {
            _sessions = sessions;
        }
        private ICollection<Session> _sessions { get; set; }
        public int SessionCount
        {
            get
            {
                return _sessions.Count;
            }
        }
        public double AvgPageVisited
        {
            get
            {
                return (_sessions.Sum(x => x.NavigationEvents?.Count ?? 0) + _sessions.Count) / _sessions.Count;
            }
        }
        public double AvgSessionDuration
        {
            get
            {
                NavigationEvent? lastNavigationEvent = _sessions.OrderByDescending(x => x.CreatedAt).First().NavigationEvents?.OrderByDescending(x => x.CreatedAt).First() ?? null;
                if (lastNavigationEvent == null) return 0;
                return _sessions.Average(x => x.CreatedAt.Subtract(lastNavigationEvent.CreatedAt).TotalSeconds) * -1;
            }
        }
        public double BounceRate
        {
            get
            {
                return _sessions.Count(x => x.NavigationEvents?.Count == 0) / SessionCount * 100;
            }
        }
        public double IsPWAPercentage
        {
            get
            {
                return _sessions.Count(x => x.IsPWA) / SessionCount * 100;
            }
        }
        public List<BrowserStatDTO> browserStats
        {
            get
            {
                return _sessions.GroupBy(x => x.Browser).Select(x => new BrowserStatDTO { Name = x.Key, Count = x.Count() }).ToList();
            }
        }
        public List<ScreenSizeStatDTO> screenSizeStats
        {
            get
            {
                return _sessions.GroupBy(x => x.DeviceWidth).Select(x => new ScreenSizeStatDTO { ScreenSize = x.Key, Count = x.Count() }).ToList();
            }
        }
        public List<PageViewStatDTO> pageViewStats
        {
            get
            {
                ICollection<NavigationEvent>? navigationEvents = _sessions.SelectMany(x => x.NavigationEvents).ToList();
                if (navigationEvents == null) return new List<PageViewStatDTO>();
                return navigationEvents
                .GroupBy(x => x.URL)
                .Select(
                    x => new PageViewStatDTO
                    {
                        Url = x.Key,
                        Count = x.Count(),
                        landingCount = _sessions.Count(y => y.LandingPage == x.Key),
                        AvgTimeSpent = 0
                    }
                ).ToList();
            }
        }
        public List<ClickEventDTO> clickEvents
        {
            get
            {
                ICollection<ClickEvent>? clickEvents = _sessions.SelectMany(x => x.ClickEvents).ToList();
                if (clickEvents == null) return new List<ClickEventDTO>();
                return clickEvents
                .GroupBy(x => x.ElementID ?? x.Value)
                .Select(
                    x =>
                    {
                        ClickEvent clickEvent = x.First();
                        return new ClickEventDTO
                        {
                            Id = x.Key,
                            Text = clickEvent.Value,
                            Value = clickEvent.TagName == "button" ? clickEvent.Type : clickEvent.URL,
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
                .GroupBy(x => x.VideoId)
                .Select(
                    x =>
                    {
                        VideoSession videoSession = x.First();
                        int startedCount = x.Count();
                        int seenQuarter = videoSession.VideoEvents.Count(x => x.Duration > videoSession.Duration * 0.25 && x.Duration < videoSession.Duration * 0.5);
                        int seenHalf = videoSession.VideoEvents.Count(x => x.Duration > videoSession.Duration * 0.5 && x.Duration < videoSession.Duration * 0.75);
                        int seenThreeQuarter = videoSession.VideoEvents.Count(x => x.Duration > videoSession.Duration * 0.75 && x.Duration < videoSession.Duration);
                        int seenFull = videoSession.VideoEvents.Count(x => x.Duration == videoSession.Duration || x.Type == VideoEventType.End);
                        return new VideoSessionStatDTO
                        {
                            Id = videoSession.VideoId,
                            Source = videoSession.Source,
                            StartedCount = startedCount,
                            SeenQuarterPercentage = (seenQuarter / startedCount) * 100,
                            SeenHalfPercentage = (seenHalf / startedCount) * 100,
                            SeenThreeQuarterPercentage = (seenThreeQuarter / startedCount) * 100,
                            SeenFullPercentage = (seenFull / startedCount) * 100
                        };
                    }
                ).ToList();
            }
        }
    }
}