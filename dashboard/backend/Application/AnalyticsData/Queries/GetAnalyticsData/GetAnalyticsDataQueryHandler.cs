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
        public GetAnalyticsDataQueryHandler(IApplicationDbContext applicationDbContext, IUserService userService)
        {
            _applicationDbContext = applicationDbContext;
            _userService = userService;
        }

        public async Task<AnalyticsDataDTO> Handle(GetAnalyticsDataQuery request, CancellationToken cancellationToken)
        {
            Website? website = await _applicationDbContext.Websites.AsNoTracking().FirstOrDefaultAsync(x => x.ID == request.websiteId && (x.UserId == _userService.Id || x.Shares.Any(y => y.UserId == _userService.Id)), cancellationToken);

            if (website == null) throw new NullReferenceException("Website not found");

            List<Session> sessions = await _applicationDbContext.Sessions
                .Where(x => x.WebsiteId == website.ID)
                .Include(x => x.ClickEvents)
                .Include(x => x.NavigationEvents)
                .Include(x => x.VideoSessions)
                .ThenInclude(x => x.VideoEvents)
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            AnalyticsDataDTO analyticsDataDTO = new AnalyticsDataDTO(sessions);

            return analyticsDataDTO;
        }
    }
}