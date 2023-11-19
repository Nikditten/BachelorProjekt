using Domain.Entities;

namespace Application.DTOs
{
    public sealed class SharedDTO
    {
        public Guid WebsiteId { get; set; }
        public WebsiteDTO? Website { get; set; }
    }
}