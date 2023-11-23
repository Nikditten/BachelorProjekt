using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Websites.Commands.UpdateWebsite
{
    public class UpdateWebsiteCommandHandler : IRequestHandler<UpdateWebsiteCommand, Unit>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IUserService _userService;

        public UpdateWebsiteCommandHandler(IApplicationDbContext context, IUserService userService)
        {
            _applicationDbContext = context;
            _userService = userService;
        }

        public async Task<Unit> Handle(UpdateWebsiteCommand request, CancellationToken cancellationToken)
        {
            Website? website = await _applicationDbContext.Websites.FirstOrDefaultAsync(x => x.ID == request.Id && x.UserId == _userService.Id, cancellationToken);

            if (website == null) throw new NullReferenceException("Website does not exist");

            website.Name = request.Name;
            website.Url = request.Url;

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}