using Domain.Common;

namespace Domain.Entities
{
    public sealed class Website : BaseEntity
    {
        public required string Name { get; set; }

        public ICollection<TeamMember>? TeamMembers { get; set; }

        public ICollection<Session>? Sessions { get; set; }
    }
}