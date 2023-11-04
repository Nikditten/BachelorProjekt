
using Domain.Common;

namespace Domain.Entities
{
    public class Session : BaseEntity
    {
        public Guid WebsiteId { get; set; }
        public required string Refferer { get; set; }
        public required int DeviceWidth { get; set; }
        public required string Browser { get; set; }
        public required bool IsPWA { get; set; }
    }
}