using Domain.Entities;

namespace Application.DTOs
{
    public class WebsiteDTO
    {
        public required Guid ID { get; set; }
        public required string Name { get; set; }
        public required string URL { get; set; }
        public ICollection<Session>? Sessions { get; set; }
    }
}