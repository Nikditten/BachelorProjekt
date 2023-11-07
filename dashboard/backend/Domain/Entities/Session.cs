
using Domain.Common;

namespace Domain.Entities
{
    public sealed class Session : BaseEntity
    {
        public required Guid WebsiteId { get; set; }

        public required string Refferer { get; set; }

        public required int DeviceWidth { get; set; }

        public required string Browser { get; set; }

        public required bool IsPWA { get; set; }

        public Website? Website { get; set; }

        public ICollection<Analytic>? Analytics { get; set; }
    }
}