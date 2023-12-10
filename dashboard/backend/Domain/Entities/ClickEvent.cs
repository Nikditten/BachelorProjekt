using Domain.Common;

namespace Domain.Entities
{
    public sealed class ClickEvent : BaseEntity
    {
        public required Guid SessionId { get; set; }
        public string? ElementID { get; set; }
        public required string ElementText { get; set; }
        public required string ElementType { get; set; }
        public string? URL { get; set; }
        public Session? Session { get; set; }
    }
}