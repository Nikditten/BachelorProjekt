using Domain.Common;

namespace Domain.Entities
{
    public sealed class Analytic : BaseEntity
    {
        public required Guid SessionId { get; set; }

        public required string Href { get; set; }

        public Session? Session { get; set; }
    }
}