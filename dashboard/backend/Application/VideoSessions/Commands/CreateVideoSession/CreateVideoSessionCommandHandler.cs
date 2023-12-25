using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.VideoSessions.Commands.CreateVideoSession
{
    public class CreateVideoSessionCommandHandler : IRequestHandler<CreateVideoSessionCommand, Guid>
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public CreateVideoSessionCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<Guid> Handle(CreateVideoSessionCommand request, CancellationToken cancellationToken)
        {
            Website? website = await _applicationDbContext.Websites.Include(x => x.Sessions).AsNoTracking().FirstOrDefaultAsync(x => x.Key == request.WebsiteKey && x.Sessions!.Any(x => x.ID == request.SessionID), cancellationToken);

            if (website == null) throw new NullReferenceException("Website not found");

            var videoSession = new VideoSession
            {
                SessionId = request.SessionID,
                VideoId = request.VideoID != null ? request.VideoID! : "Not specified",
                Duration = request.Duration,
                Source = request.Source
            };

            _applicationDbContext.VideoSessions.Add(videoSession);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return videoSession.ID;
        }


    }
}