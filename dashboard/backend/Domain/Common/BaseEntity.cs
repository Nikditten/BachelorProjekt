
namespace Domain.Common;

public abstract class BaseEntity
{
    public Guid ID { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }
}