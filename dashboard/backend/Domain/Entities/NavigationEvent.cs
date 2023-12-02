using Domain.Common;

namespace Domain.Entities
{
    public sealed class NavigationEvent : BaseEntity
    {
        public required Guid SessionId { get; set; }
        public required string URL { get; set; }
        public Session? Session { get; set; }
    }
}