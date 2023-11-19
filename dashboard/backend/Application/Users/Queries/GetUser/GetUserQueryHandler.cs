using Application.Common.Interfaces;
using Application.DTOs;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Queries.GetUser
{
    public class GetUserQueryHandler : IRequestHandler<GetUserQuery, UserDTO>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public GetUserQueryHandler(IApplicationDbContext applicationDbContext, IUserService userService, IMapper mapper)
        {
            _applicationDbContext = applicationDbContext;
            _userService = userService;
            _mapper = mapper;
        }
        public async Task<UserDTO> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            string userId = _userService.Id;

            if (userId is null) throw new UnauthorizedAccessException();

            User? user = await _applicationDbContext.Users.Where(x => x.ID == new Guid(userId))
                                                        .Include(x => x.Shares)
                                                        .ThenInclude(x => x.Website)
                                                        .AsNoTracking()
                                                        .FirstOrDefaultAsync(cancellationToken);

            if (user is null) throw new UnauthorizedAccessException();

            return _mapper.Map<UserDTO>(user);
        }
    }
}