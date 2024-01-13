using Domain.Common;

namespace Domain.Entities
{
    public sealed class Shared : BaseEntity
    {
        public required Guid UserId { get; set; }
        public required Guid WebsiteId { get; set; }
        public User? User { get; set; }
        public Website? Website { get; set; }
    }
}