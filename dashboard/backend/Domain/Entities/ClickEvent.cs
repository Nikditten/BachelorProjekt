using Domain.Common;

namespace Domain.Entities
{
    public sealed class ClickEvent : BaseEntity
    {
        public required Guid SessionId { get; set; }
        public required string CurrentURL { get; set; }
        public string? ElementID { get; set; } = "Not specified";
        public required string TagName { get; set; }
        public required string Value { get; set; }
        public string Type { get; set; } = "Not specified";
        public string URL { get; set; } = "Not specified";
        public Session? Session { get; set; }
    }
}