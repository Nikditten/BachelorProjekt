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

            Website? website = await _applicationDbContext.Websites.Include(x => x.Sessions).AsNoTracking().FirstOrDefaultAsync(x => x.Key == request.WebsiteKey && x.Sessions!.Any(x => x.ID == request.SessionID), cancellationToken);

            if (website == null) throw new NullReferenceException("Website not found");

            var clickEvent = new ClickEvent
            {
                SessionId = request.SessionID,
                ElementID = request.ElementID,
                ElementText = request.ElementText,
                ElementType = request.ElementType == "button" ? "button" : "link",
                URL = request.URL ?? "",
            };

            _applicationDbContext.ClickEvents.Add(clickEvent);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }


    }
}