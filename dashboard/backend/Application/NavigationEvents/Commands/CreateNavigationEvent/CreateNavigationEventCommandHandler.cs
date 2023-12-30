using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
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

            Website? website = await _applicationDbContext.Websites.AsNoTracking().FirstOrDefaultAsync(x => x.Key == request.WebsiteKey, cancellationToken);

            if (website == null) throw new NullReferenceException("Website not found");

            Session? session = await _applicationDbContext.Sessions.Include(x => x.NavigationEvents).AsNoTracking().FirstOrDefaultAsync(x => x.WebsiteId == website.ID && x.ID == request.SessionID, cancellationToken);

            if (session == null) throw new NullReferenceException("Session not found");

            int navigationEventIndex = 0;

            if (session.NavigationEvents != null)
            {
                navigationEventIndex = session.NavigationEvents.Count;
            }

            var navigationEvent = new NavigationEvent
            {
                SessionId = request.SessionID,
                Index = navigationEventIndex,
                Type = NavigationType.Routing,
                URL = request.URL,
            };

            _applicationDbContext.NavigationEvents.Add(navigationEvent);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }


    }
}