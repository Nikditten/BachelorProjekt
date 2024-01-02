using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.ClickEvents.Commands.CreateClickEvent
{
    public class CreateClickEventCommandHandler : IRequestHandler<CreateClickEventCommand, Unit>
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public CreateClickEventCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<Unit> Handle(CreateClickEventCommand request, CancellationToken cancellationToken)
        {

            Website? website = await _applicationDbContext.Websites.AsNoTracking().FirstOrDefaultAsync(x => x.Key == request.WebsiteKey, cancellationToken);

            if (website == null) throw new NullReferenceException("Website not found");

            Session? session = await _applicationDbContext.Sessions.AsNoTracking().FirstOrDefaultAsync(x => x.ID == request.SessionID, cancellationToken);

            if (session == null) throw new NullReferenceException("Session not found");

            var clickEvent = new ClickEvent
            {
                SessionId = request.SessionID,
                ElementID = request.ElementID,
                ElementText = request.ElementText,
                ElementType = request.ElementType,
                URL = request.URL,
            };

            session.UpdatedAt = DateTime.UtcNow;

            _applicationDbContext.ClickEvents.Add(clickEvent);

            _applicationDbContext.Sessions.Update(session);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }


    }
}