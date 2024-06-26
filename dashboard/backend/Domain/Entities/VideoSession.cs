using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
    public sealed class VideoSession : BaseEntity
    {
        public required Guid SessionId { get; set; }
        public string VideoId { get; set; } = "Not specified";
        public required string Source { get; set; }
        public required double Duration { get; set; }
        public required string URL { get; set; }
        public Session? Session { get; set; }
        public ICollection<VideoEvent>? VideoEvents { get; set; }
    }
}