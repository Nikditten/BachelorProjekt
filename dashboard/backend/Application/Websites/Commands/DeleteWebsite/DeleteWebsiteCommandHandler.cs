using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Websites.Commands.DeleteWebsite
{
    public class DeleteWebsiteCommandHandler : IRequestHandler<DeleteWebsiteCommand, Unit>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IUserService _userService;

        public DeleteWebsiteCommandHandler(IApplicationDbContext applicationDbContext, IUserService userService)
        {
            _applicationDbContext = applicationDbContext;
            _userService = userService;
        }
        public async Task<Unit> Handle(DeleteWebsiteCommand request, CancellationToken cancellationToken)
        {
            Website? website = await _applicationDbContext.Websites.FirstOrDefaultAsync(x => x.ID == request.WebsiteId, cancellationToken);

            if (website is null) throw new NullReferenceException("Website does not exist");

            if (website.UserId != new Guid(_userService.Id)) throw new UnauthorizedAccessException();

            _applicationDbContext.Websites.Remove(website);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}