using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.VideoSessions.Commands.EndVideoSession
{
    public class EndVideoSessionCommandHandler : IRequestHandler<EndVideoSessionCommand, Unit>
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public EndVideoSessionCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<Unit> Handle(EndVideoSessionCommand request, CancellationToken cancellationToken)
        {

            Website? website = await _applicationDbContext.Websites.AsNoTracking().FirstOrDefaultAsync(x => x.Key == request.WebsiteKey, cancellationToken);

            if (website == null) throw new NullReferenceException("Website not found");

            Session? session = await _applicationDbContext.Sessions.AsNoTracking().FirstOrDefaultAsync(x => x.ID == request.SessionID, cancellationToken);

            if (session == null) throw new NullReferenceException("Session not found");

            VideoSession? videoSession = await _applicationDbContext.VideoSessions.Include(x => x.VideoEvents).AsNoTracking().FirstOrDefaultAsync(x => x.ID == request.VideoSessionID, cancellationToken);

            if (videoSession == null) throw new NullReferenceException("VideoSession not found");

            var videoEvent = new VideoEvent
            {
                VideoSessionId = request.VideoSessionID,
                Duration = request.Duration,
                Type = VideoEventType.End
            };

            session.UpdatedAt = DateTime.UtcNow;

            _applicationDbContext.VideoEvents.Add(videoEvent);

            _applicationDbContext.Sessions.Update(session);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }


    }
}