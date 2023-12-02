using Domain.Enums;
using MediatR;

namespace Application.VideoEvents.Commands.CreateVideoEvent
{
    public class CreateVideoEventCommand : IRequest<Unit>
    {
        public required Guid WebsiteKey { get; set; }
        public required Guid SessionID { get; set; }
        public string? VideoID { get; set; }
        public required VideoEventType Type { get; set; }
        public required string Source { get; set; }
        public required int Duration { get; set; }
    }
}
