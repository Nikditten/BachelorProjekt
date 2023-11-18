using Application.Common.Interfaces;
using Application.Common.Mapping;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Queries.GetUser
{
    public class GetUserQueryHandler : IRequestHandler<GetUserQuery, GetUserDTO>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IUserService _userService;
        public GetUserQueryHandler(IApplicationDbContext applicationDbContext, IUserService userService)
        {
            _applicationDbContext = applicationDbContext;
            _userService = userService;
        }
        public async Task<GetUserDTO> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            string userId = _userService.Id;

            if (userId is null) throw new UnauthorizedAccessException();

            User? user = await _applicationDbContext.Users.Where(x => x.ID == new Guid(userId))
                                                        .Include(x => x.Shares)
                                                        .ThenInclude(x => x.Website)
                                                        .AsNoTracking()
                                                        .FirstOrDefaultAsync(cancellationToken);

            if (user is null) throw new UnauthorizedAccessException();

            return TMapper<User, GetUserDTO>.Map(user);
        }
    }
}