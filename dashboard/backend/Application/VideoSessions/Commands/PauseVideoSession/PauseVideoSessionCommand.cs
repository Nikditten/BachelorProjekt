using Domain.Enums;
using MediatR;

namespace Application.VideoSessions.Commands.PauseVideoSession
{
    public class PauseVideoSessionCommand : IRequest<Unit>
    {
        public required Guid WebsiteKey { get; set; }
        public required Guid VideoSessionID { get; set; }
        public required double Duration { get; set; }
    }
}
