using Application.Common.Interfaces;
using Application.DTOs;
using Application.DTOs.AnalyticsData;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.AnalyticsData.Queries.GetAnalyticsData
{
    public class GetAnalyticsDataQueryHandler : IRequestHandler<GetAnalyticsDataQuery, AnalyticsDataDTO>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public GetAnalyticsDataQueryHandler(IApplicationDbContext applicationDbContext, IUserService userService, IMapper mapper)
        {
            _applicationDbContext = applicationDbContext;
            _userService = userService;
            _mapper = mapper;
        }

        public async Task<AnalyticsDataDTO> Handle(GetAnalyticsDataQuery request, CancellationToken cancellationToken)
        {
            Website? website = await _applicationDbContext.Websites.AsNoTracking().FirstOrDefaultAsync(x => x.ID == request.websiteId && x.UserId == _userService.Id, cancellationToken);

            if (website == null) throw new NullReferenceException("Website not found");

            List<Session> sessions = await _applicationDbContext.Sessions
                .Where(x => x.WebsiteId == website.ID)
                .Include(x => x.ClickEvents)
                .Include(x => x.NavigationEvents)
                .Include(x => x.VideoSessions)
                .ThenInclude(x => x.VideoEvents)
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            AnalyticsDataDTO analyticsDataDTO = new AnalyticsDataDTO
            {
                SessionCount = sessions.Count,
                AvgPageVisited = sessions.Average(x => x.NavigationEvents?.Count ?? 0) + 1,
                AvgSessionDuration = sessions.Average(x => x.CreatedAt.Subtract(x.NavigationEvents.OrderBy(x => x.CreatedAt).First().CreatedAt).TotalSeconds) * -1,
                BounceRate = (sessions.Count(x => x.NavigationEvents.Count == 0) / sessions.Count) * 100,
                IsPWAPercentage = (sessions.Count(x => x.IsPWA) / sessions.Count) * 100,
                browserStats = sessions.GroupBy(x => x.Browser).Select(x => new BrowserStatDTO { Name = x.Key, Count = x.Count() }).ToList(),
                screenSizeStats = sessions.GroupBy(x => x.DeviceWidth).Select(x => new ScreenSizeStatDTO { ScreenSize = x.Key, Count = x.Count() }).ToList(),
                clickEvents = sessions.SelectMany(x => x.ClickEvents).GroupBy(x => x.ElementID ?? x.Value).Select(x => new ClickEventDTO { Id = x.Key, Text = x.First().Value, Value = x.First().Type ?? x.First().URL, Count = x.Count() }).ToList(),
                pageViewStats = sessions.SelectMany(x => x.NavigationEvents).GroupBy(x => x.URL).Select(x => new PageViewStatDTO { Url = x.Key, Count = x.Count(), AvgTimeSpent = 0 }).ToList(),
                videoSessionStats = sessions.SelectMany(x => x.VideoSessions).GroupBy(x => x.VideoId).Select(x =>
                {
                    VideoSession videoSession = x.First();

                    int startedCount = x.Count();
                    int seenQuarter = videoSession.VideoEvents.Count(x => x.Duration > videoSession.Duration * 0.25 && x.Duration < videoSession.Duration * 0.5);
                    int seenHalf = videoSession.VideoEvents.Count(x => x.Duration > videoSession.Duration * 0.5 && x.Duration < videoSession.Duration * 0.75);
                    int seenThreeQuarter = videoSession.VideoEvents.Count(x => x.Duration > videoSession.Duration * 0.75 && x.Duration < videoSession.Duration);
                    int seenFull = videoSession.VideoEvents.Count(x => x.Duration == videoSession.Duration);


                    VideoSessionStatDTO videoSessionStatDTO = new VideoSessionStatDTO
                    {
                        Id = videoSession.VideoId ?? "Not specified",
                        Source = videoSession.Source,
                        StartedCount = startedCount,
                        SeenQuarterPercentage = (seenQuarter / startedCount) * 100,
                        SeenHalfPercentage = (seenHalf / startedCount) * 100,
                        SeenThreeQuarterPercentage = (seenThreeQuarter / startedCount) * 100,
                        SeenFullPercentage = (seenFull / startedCount) * 100
                    };
                    return videoSessionStatDTO;
                }
                ).ToList()
            };

            return analyticsDataDTO;
        }
    }
}