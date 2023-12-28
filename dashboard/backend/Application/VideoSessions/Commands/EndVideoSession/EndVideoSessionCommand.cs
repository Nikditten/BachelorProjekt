using Domain.Enums;
using MediatR;

namespace Application.VideoSessions.Commands.EndVideoSession
{
    public class EndVideoSessionCommand : IRequest<Unit>
    {
        public required Guid WebsiteKey { get; set; }
        public required Guid VideoSessionID { get; set; }
        public required Guid SessionID { get; set; }
        public required double Duration { get; set; }
    }
}
