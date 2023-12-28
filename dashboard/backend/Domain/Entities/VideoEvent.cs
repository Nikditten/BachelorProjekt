using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
    public sealed class VideoEvent : BaseEntity
    {
        public required Guid VideoSessionId { get; set; }
        public required double Duration { get; set; }
        public required VideoEventType Type { get; set; }
        public VideoSession? VideoSession { get; set; }
    }
}