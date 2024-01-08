using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.VideoSessions.Commands.PauseVideoSession
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

            Website? website = await _applicationDbContext.Websites.AsNoTracking().FirstOrDefaultAsync(x => x.Key == request.WebsiteKey, cancellationToken);

            if (website == null) throw new NullReferenceException("Website not found");

            VideoSession? videoSession = await _applicationDbContext.VideoSessions.AsNoTracking().FirstOrDefaultAsync(x => x.ID == request.VideoSessionID, cancellationToken);

            if (videoSession == null) throw new NullReferenceException("VideoSession not found");

            Session? session = await _applicationDbContext.Sessions.FirstOrDefaultAsync(x => x.ID == videoSession.SessionId, cancellationToken);

            if (session == null) throw new NullReferenceException("Session not found");

            var videoEvent = new VideoEvent
            {
                VideoSessionId = request.VideoSessionID,
                Duration = request.Duration,
                Type = VideoEventType.Pause
            };

            session.UpdatedAt = DateTime.UtcNow;

            _applicationDbContext.VideoEvents.Add(videoEvent);

            _applicationDbContext.Sessions.Update(session);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }


    }
}