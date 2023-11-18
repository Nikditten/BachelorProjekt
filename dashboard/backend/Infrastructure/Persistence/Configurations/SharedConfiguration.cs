using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class SharesConfiguration : IEntityTypeConfiguration<Shared>
    {
        public void Configure(EntityTypeBuilder<Shared> builder)
        {
            builder
                .HasOne(x => x.User)
                .WithMany(x => x.Shares)
                .HasForeignKey(x => x.UserId)
                .IsRequired(true);

            builder
                .HasOne(x => x.Website)
                .WithMany(x => x.Shares)
                .HasForeignKey(x => x.WebsiteId)
                .IsRequired(true);
        }
    }
}

