using Application.DTOs;
using Domain.Entities;

namespace Application.Websites.Queries.GetWebsites
{
    public class UserWebsiteDTO
    {
        public required Guid ID { get; set; }
        public required Guid Key { get; set; }
        public required bool isAdmin { get; set; }
        public required string Name { get; set; }
        public required string URL { get; set; }
        public ICollection<Session>? Sessions { get; set; }
        public ICollection<UserDTO>? SharedWith { get; set; }
    }
}