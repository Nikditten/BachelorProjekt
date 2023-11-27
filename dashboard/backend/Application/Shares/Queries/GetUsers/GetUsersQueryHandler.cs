using System.IO.Compression;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Shares.Queries.GetUsers
{
    public class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, List<SharedUserDTO>>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public GetUsersQueryHandler(IApplicationDbContext applicationDbContext, IMapper mapper, IUserService userService)
        {
            _applicationDbContext = applicationDbContext;
            _mapper = mapper;
            _userService = userService;
        }

        public async Task<List<SharedUserDTO>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
        {
            Website? website = await _applicationDbContext.Websites.AsNoTracking().FirstOrDefaultAsync(x => x.ID == request.WebsiteId && x.UserId == _userService.Id, cancellationToken);
            if (website == null) throw new NullReferenceException("Website does not exist");

            var users = _applicationDbContext.Shares.Where(x => x.WebsiteId == request.WebsiteId).Include(x => x.User).AsNoTracking().Select(x => x.User);

            return await users.ProjectTo<SharedUserDTO>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);
        }
    }
}