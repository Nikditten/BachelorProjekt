
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.DTOs;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Shares.Commands.ShareWebsite
{
    public class ShareWebsiteCommandHandler : IRequestHandler<ShareWebsiteCommand, UserDTO>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public ShareWebsiteCommandHandler(IApplicationDbContext applicationDbContext, IUserService userService, IMapper mapper)
        {
            _applicationDbContext = applicationDbContext;
            _userService = userService;
            _mapper = mapper;
        }
        public async Task<UserDTO> Handle(ShareWebsiteCommand request, CancellationToken cancellationToken)
        {
            Website? website = await _applicationDbContext.Websites.FirstOrDefaultAsync(x => x.ID == request.Id, cancellationToken);

            User? user = await _applicationDbContext.Users.FirstOrDefaultAsync(x => x.Username == request.Username, cancellationToken);

            if (website == null) throw new NullReferenceException("Website does not exist");
            if (user == null) throw new NullReferenceException("User does not exist");

            if (website.UserId != _userService.Id) throw new UnauthorizedAccessException();

            Shared? shared = await _applicationDbContext.Shares.FirstOrDefaultAsync(x => x.UserId == user.ID && x.WebsiteId == request.Id, cancellationToken);

            if (shared != null) throw new AlreadyExistsException("Website already shared with this user");

            var shares = new Shared { UserId = user.ID, WebsiteId = request.Id };

            _applicationDbContext.Shares.Add(shares);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<UserDTO>(user);
        }
    }
}