
using Domain.Common;

namespace Domain.Entities
{
    public class User : BaseEntity
    {
        public required string Name { get; set; }

        public required string Username { get; set; }

        public required string HashedPassword { get; set; }

        public required string Salt { get; set; }
    }
}