
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Websites.Commands.CreateWebsite
{
    public class CreateWebsiteCommandHandler : IRequestHandler<CreateWebsiteCommand, string>
    {

        private readonly IApplicationDbContext _applicationDbContext;

        private readonly IUserService _userService;

        public CreateWebsiteCommandHandler(IApplicationDbContext applicationDbContext, IUserService userService)
        {
            _applicationDbContext = applicationDbContext;

            _userService = userService;
        }

        public async Task<string> Handle(CreateWebsiteCommand request, CancellationToken cancellationToken)
        {

            string userId = _userService.Id;

            if (userId is null) throw new UnauthorizedAccessException();

            var website = new Website { Name = request.Name, UserId = new Guid(userId) };

            _applicationDbContext.Websites.Add(website);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return website.ID.ToString();
        }
    }
}

