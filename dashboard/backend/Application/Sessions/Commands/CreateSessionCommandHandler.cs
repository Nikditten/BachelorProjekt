

using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Sessions.Commands.CreateSession
{
    public class CreateSessionCommandHandler : IRequestHandler<CreateSessionCommand, Guid>
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public CreateSessionCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<Guid> Handle(CreateSessionCommand request, CancellationToken cancellationToken)
        {
            Website? website = await _applicationDbContext.Websites.FirstOrDefaultAsync(x => x.Key == request.Key, cancellationToken);

            if (website == null) throw new NullReferenceException("Website does not exists");

            var session = new Session
            {
                WebsiteId = website.ID,
                DeviceWidth = request.DeviceWidth,
                Browser = request.Browser,
                Language = request.Language,
                OS = request.OS,
                Orientation = request.Orientation,
                IsPWA = request.IsPWA
            };

            _applicationDbContext.Sessions.Add(session);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return session.ID;
        }
    }
}
