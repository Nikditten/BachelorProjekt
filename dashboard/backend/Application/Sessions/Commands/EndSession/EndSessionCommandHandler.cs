

using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace Application.Sessions.Commands.EndSession
{
    public class EndSessionCommandHandler : IRequestHandler<EndSessionCommand, Unit>
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public EndSessionCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<Unit> Handle(EndSessionCommand request, CancellationToken cancellationToken)
        {
            Website? website = await _applicationDbContext.Websites.AsNoTracking().FirstOrDefaultAsync(x => x.Key == request.WebsiteKey, cancellationToken);

            if (website == null) throw new NullReferenceException("Website does not exists");

            Session? session = await _applicationDbContext.Sessions.AsNoTracking().FirstOrDefaultAsync(x => x.ID == request.SessionID && x.WebsiteId == website.ID, cancellationToken);

            if (session == null) throw new NullReferenceException("Session does not exists");

            session.EndedAt = DateTimeOffset.UtcNow;

            _applicationDbContext.Sessions.Update(session);

            NavigationEvent? navigationEvent = await _applicationDbContext.NavigationEvents.AsNoTracking().OrderBy(x => x.CreatedAt).LastOrDefaultAsync(x => x.SessionId == session.ID, cancellationToken);

            Console.WriteLine("TYPE: " + navigationEvent?.Type);

            if (navigationEvent != null)
            {
                switch (navigationEvent.Type)
                {
                    case NavigationType.Landing:
                        navigationEvent.Type = NavigationType.Bouncing;
                        navigationEvent.UpdatedAt = DateTimeOffset.UtcNow;
                        _applicationDbContext.NavigationEvents.Update(navigationEvent);
                        break;
                    case NavigationType.Routing:
                        navigationEvent.Type = NavigationType.Leaving;
                        navigationEvent.UpdatedAt = DateTimeOffset.UtcNow;
                        _applicationDbContext.NavigationEvents.Update(navigationEvent);
                        break;
                    default:
                        break;
                }


            }

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
