using Domain.Common;

namespace Domain.Entities
{
    public class TeamMember
    {
        public Guid UserId { get; set; }
        public Guid WebsiteId { get; set; }
        public int Role { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
    }
}