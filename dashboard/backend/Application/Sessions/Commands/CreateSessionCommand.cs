using Domain.Enums;
using MediatR;

namespace Application.Sessions.Commands.CreateSession
{
    public class CreateSessionCommand : IRequest<Guid>
    {
        public required Guid Key { get; set; }

        public required int DeviceWidth { get; set; }

        public required string Browser { get; set; }

        public required string Language { get; set; }

        public required string OS { get; set; }

        public required ScreenOrientation Orientation { get; set; }

        public required bool IsPWA { get; set; }
    }
}
