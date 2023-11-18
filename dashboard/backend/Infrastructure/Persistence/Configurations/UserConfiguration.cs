using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

// SOURCE https://learn.microsoft.com/en-us/ef/core/modeling/relationships/one-to-many

namespace Infrastructure.Persistence.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder
                .HasMany(x => x.Shares)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId)
                .IsRequired(true);

            builder
                .HasMany(x => x.Websites)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId)
                .IsRequired(true);
        }
    }
}

