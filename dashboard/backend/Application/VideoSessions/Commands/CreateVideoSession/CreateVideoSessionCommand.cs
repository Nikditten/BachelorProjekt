using MediatR;

namespace Application.VideoSessions.Commands.CreateVideoSession
{
    public class CreateVideoSessionCommand : IRequest<Guid>
    {
        public required Guid WebsiteKey { get; set; }
        public required Guid SessionID { get; set; }
        public string? VideoID { get; set; }
        public required string Source { get; set; }
        public required double Duration { get; set; }
        public required string URL { get; set; }
    }
}
