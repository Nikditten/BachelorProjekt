using Application.Common.Interfaces;
using Application.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Websites.Queries.GetWebsites
{
    public class GetWebsitesQueryHandler : IRequestHandler<GetWebsitesQuery, List<UserWebsiteDTO>>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IUserService _userService;

        public GetWebsitesQueryHandler(IApplicationDbContext applicationDbContext, IUserService userService)
        {
            _applicationDbContext = applicationDbContext;
            _userService = userService;
        }

        public async Task<List<UserWebsiteDTO>> Handle(GetWebsitesQuery request, CancellationToken cancellationToken)
        {
            Guid userId = _userService.Id;

            var websites = await _applicationDbContext.Websites
                .Where(x => x.UserId == userId || x.Shares.Any(x => x.UserId == userId))
                .Select(x => new UserWebsiteDTO
                {
                    ID = x.ID,
                    Key = x.Key,
                    isAdmin = x.UserId == userId,
                    Name = x.Name,
                    URL = x.Url,
                    Sessions = x.Sessions,
                    SharedWith = x.UserId == userId ? x.Shares.Select(x => new UserDTO
                    {
                        ID = x.UserId,
                        Name = x.User.Name,
                        Username = x.User.Username
                    }).ToList() : null
                })
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            return websites;
        }
    }
}