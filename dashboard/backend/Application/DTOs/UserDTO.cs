namespace Application.DTOs
{
    public class UserDTO
    {
        public Guid ID { get; set; }
        public required string Name { get; set; }
        public ICollection<SharedDTO>? Shares { get; set; }
        public ICollection<WebsiteDTO>? Websites { get; set; }
    }
}