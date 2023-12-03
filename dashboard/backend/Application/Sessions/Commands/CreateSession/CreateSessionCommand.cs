using Domain.Enums;
using MediatR;

namespace Application.Sessions.Commands.CreateSession
{
    public class CreateSessionCommand : IRequest<Guid>
    {
        public required Guid WebsiteKey { get; set; }

        public required string LandingPage { get; set; }

        public required int DeviceWidth { get; set; }

        public required string Browser { get; set; }

        public required string Language { get; set; }

        public required ScreenOrientation Orientation { get; set; }

        public required bool IsPWA { get; set; }
    }
}
