using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
    public sealed class VideoEvent : BaseEntity
    {
        public required Guid WebsiteKey { get; set; }
        public required Guid SessionId { get; set; }
        public string? VideoId { get; set; } = "Not specified";
        public required VideoEventType Type { get; set; }
        public required string Source { get; set; }
        public required int Duration { get; set; }
        public Session? Session { get; set; }
    }
}