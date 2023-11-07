using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
    public sealed class TeamMember : BaseEntity
    {
        public required Guid UserId { get; set; }

        public required Guid WebsiteId { get; set; }

        public UserRole Role { get; set; } = UserRole.USER;

        public User? User { get; set; }

        public Website? Website { get; set; }
    }
}