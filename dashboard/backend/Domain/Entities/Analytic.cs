using Domain.Common;

namespace Domain.Entities
{
    public class Analytic : BaseEntity
    {
        public Guid SessionId { get; set; }
        public required string Href { get; set; }
    }
}