using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.NavigationEvents.Commands.CreateNavigationEvent
{
    public class CreateNavigationEventCommandHandler : IRequestHandler<CreateNavigationEventCommand, Unit>
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public CreateNavigationEventCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<Unit> Handle(CreateNavigationEventCommand request, CancellationToken cancellationToken)
        {

            Website? website = await _applicationDbContext.Websites.Include(x => x.Sessions).AsNoTracking().FirstOrDefaultAsync(x => x.Key == request.WebsiteKey && x.Sessions!.Any(x => x.ID == request.SessionID), cancellationToken);

            if (website == null) throw new NullReferenceException("Website not found");

            var navigationEvent = new NavigationEvent
            {
                SessionId = request.SessionID,
                URL = request.URL,
            };

            _applicationDbContext.NavigationEvents.Add(navigationEvent);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }


    }
}