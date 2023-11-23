
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Shares.Commands.ShareWebsite
{
    public class ShareWebsiteCommandHandler : IRequestHandler<ShareWebsiteCommand, Unit>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IUserService _userService;

        public ShareWebsiteCommandHandler(IApplicationDbContext applicationDbContext, IUserService userService)
        {
            _applicationDbContext = applicationDbContext;
            _userService = userService;
        }
        public async Task<Unit> Handle(ShareWebsiteCommand request, CancellationToken cancellationToken)
        {
            Website? website = await _applicationDbContext.Websites.FirstOrDefaultAsync(x => x.ID == request.Id, cancellationToken);

            if (website == null) throw new NullReferenceException("Website does not exist");

            if (website.UserId != _userService.Id) throw new UnauthorizedAccessException();

            var shares = new Shared { UserId = request.UserId, WebsiteId = request.Id };

            _applicationDbContext.Shares.Add(shares);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}