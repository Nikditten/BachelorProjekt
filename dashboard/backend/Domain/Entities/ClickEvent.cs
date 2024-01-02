using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
    public sealed class ClickEvent : BaseEntity
    {
        public required Guid SessionId { get; set; }
        public string? ElementID { get; set; }
        public required string ElementText { get; set; }
        public required ElementType ElementType { get; set; }
        public required string URL { get; set; }
        public Session? Session { get; set; }
    }
}