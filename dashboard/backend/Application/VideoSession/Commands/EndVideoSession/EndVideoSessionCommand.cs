using Domain.Enums;
using MediatR;

namespace Application.VideoEvents.Commands.EndVideoSession
{
    public class EndVideoSessionCommand : IRequest<Unit>
    {
        public required Guid WebsiteKey { get; set; }
        public required Guid VideoSessionID { get; set; }
        public required Guid SessionID { get; set; }
        public required int Duration { get; set; }
    }
}
