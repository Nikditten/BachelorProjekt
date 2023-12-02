using Domain.Common;

namespace Domain.Entities
{
    public sealed class ClickEvent : BaseEntity
    {
        public required Guid SessionId { get; set; }
        public string? ElementID { get; set; } = "Not specified";
        public required string TagName { get; set; }
        public required string Value { get; set; }
        public string? Type { get; set; }
        public string? URL { get; set; }
        public Session? Session { get; set; }
    }
}