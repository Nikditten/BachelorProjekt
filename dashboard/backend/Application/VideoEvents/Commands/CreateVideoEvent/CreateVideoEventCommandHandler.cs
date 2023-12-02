using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.VideoEvents.Commands.CreateVideoEvent
{
    public class CreateVideoEventCommandHandler : IRequestHandler<CreateVideoEventCommand, Unit>
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public CreateVideoEventCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<Unit> Handle(CreateVideoEventCommand request, CancellationToken cancellationToken)
        {

            Website? website = await _applicationDbContext.Websites.Include(x => x.Sessions).AsNoTracking().FirstOrDefaultAsync(x => x.Key == request.WebsiteKey && x.Sessions!.Any(x => x.ID == request.SessionID), cancellationToken);

            if (website == null) throw new NullReferenceException("Website not found");

            var videoEvent = new VideoEvent
            {
                WebsiteKey = request.WebsiteKey,
                SessionId = request.SessionID,
                VideoId = request.VideoID,
                Type = request.Type,
                Duration = request.Duration,
                Source = request.Source
            };

            _applicationDbContext.VideoEvents.Add(videoEvent);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }


    }
}