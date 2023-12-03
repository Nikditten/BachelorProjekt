using Domain.Enums;
using MediatR;

namespace Application.VideoEvents.Commands.PauseVideoSession
{
    public class PauseVideoSessionCommand : IRequest<Unit>
    {
        public required Guid WebsiteKey { get; set; }
        public required Guid SessionID { get; set; }
        public required Guid VideoSessionID { get; set; }
        public required int Duration { get; set; }
    }
}
