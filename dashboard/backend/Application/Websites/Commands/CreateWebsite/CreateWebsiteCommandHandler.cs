
using Application.Common.Exceptions;
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
            var websiteExists = _applicationDbContext.Websites.Any(x => x.Name == request.Name && x.UserId == _userService.Id);

            if (websiteExists) throw new AlreadyExistsException("Website already exists");

            var website = new Website { Name = request.Name, UserId = _userService.Id, Url = request.Url };

            _applicationDbContext.Websites.Add(website);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return website.ID.ToString();
        }
    }
}

