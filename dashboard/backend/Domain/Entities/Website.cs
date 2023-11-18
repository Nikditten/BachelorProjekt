using Domain.Common;

namespace Domain.Entities
{
    public sealed class Website : BaseEntity
    {
        public required string Name { get; set; }
        public required Guid UserId { get; set; }
        public User? User { get; set; }
        public ICollection<Shared>? Shares { get; set; }
        public ICollection<Session>? Sessions { get; set; }
    }
}