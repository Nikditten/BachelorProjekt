using Domain.Entities;

namespace Application.Users.Queries.GetUser
{
    public class GetUserDTO
    {
        public Guid ID { get; set; }
        public required string Name { get; set; }
        public ICollection<Shared>? Shares { get; set; }

        public static explicit operator GetUserDTO(User v)
        {
            throw new NotImplementedException();
        }
    }
}