
using Domain.Common;

namespace Domain.Entities
{
    public sealed class User : BaseEntity
    {
        public required string Name { get; set; }
        public required string Username { get; set; }
        public required string HashedPassword { get; set; }
        public required byte[] Salt { get; set; }
        public ICollection<Shared>? Shares { get; set; }
        public ICollection<Website>? Websites { get; set; }
    }
}