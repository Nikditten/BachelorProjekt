using Domain.Common;

namespace Domain.Entities
{
    public class Website : BaseEntity
    {
        public required string Name { get; set; }
    }
}