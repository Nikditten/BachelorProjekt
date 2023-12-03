using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.VideoEvents.Commands.PauseVideoSession
{
    public class PauseVideoSessionCommandHandler : IRequestHandler<PauseVideoSessionCommand, Unit>
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public PauseVideoSessionCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<Unit> Handle(PauseVideoSessionCommand request, CancellationToken cancellationToken)
        {

            Website? website = await _applicationDbContext.Websites.Include(x => x.Sessions).AsNoTracking().FirstOrDefaultAsync(x => x.Key == request.WebsiteKey && x.Sessions!.Any(x => x.ID == request.SessionID), cancellationToken);

            if (website == null) throw new NullReferenceException("Website not found");

            VideoSession? videoSession = await _applicationDbContext.VideoSessions.Include(x => x.VideoEvents).AsNoTracking().FirstOrDefaultAsync(x => x.ID == request.VideoSessionID, cancellationToken);

            if (videoSession == null) throw new NullReferenceException("VideoSession not found");

            var videoEvent = new VideoEvent
            {
                VideoSessionId = request.VideoSessionID,
                Duration = request.Duration,
                Type = VideoEventType.Pause
            };

            _applicationDbContext.VideoEvents.Add(videoEvent);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }


    }
}