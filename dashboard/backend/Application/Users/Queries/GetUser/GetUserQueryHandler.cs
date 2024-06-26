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
            User? user = await _applicationDbContext.Users.Where(x => x.ID == _userService.Id)
                .Include(x => x.Shares)
                .ThenInclude(x => x.Website)
                .Include(x => x.Websites)
                .AsNoTracking()
                .FirstOrDefaultAsync(cancellationToken);

            if (user is null) throw new UnauthorizedAccessException();

            return _mapper.Map<UserDTO>(user);
        }
    }
}