using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
    public sealed class NavigationEvent : BaseEntity
    {
        public required Guid SessionId { get; set; }
        public required int Index { get; set; }
        public required NavigationType Type { get; set; }
        public required string URL { get; set; }
        public Session? Session { get; set; }
    }
}