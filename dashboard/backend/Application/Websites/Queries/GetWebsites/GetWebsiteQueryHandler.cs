using Application.Common.Interfaces;
using Application.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Websites.Queries.GetWebsites
{
    public class GetWebsitesQueryHandler : IRequestHandler<GetWebsitesQuery, List<WebsiteDTO>>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public GetWebsitesQueryHandler(IApplicationDbContext applicationDbContext, IUserService userService, IMapper mapper)
        {
            _applicationDbContext = applicationDbContext;
            _userService = userService;
            _mapper = mapper;
        }

        public async Task<List<WebsiteDTO>> Handle(GetWebsitesQuery request, CancellationToken cancellationToken)
        {
            Guid userId = _userService.Id;

            var websites = await _applicationDbContext.Websites
                .Where(x => x.UserId == userId || x.Shares.Any(x => x.UserId == userId))
                .Select(x => new WebsiteDTO
                {
                    ID = x.ID,
                    isAdmin = x.UserId == userId,
                    Name = x.Name,
                    URL = x.Url,
                    Sessions = x.Sessions
                }).ToListAsync(cancellationToken);

            return websites;
        }
    }
}