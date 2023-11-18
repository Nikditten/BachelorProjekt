
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
	public class SharesConfiguration : IEntityTypeConfiguration<Shares>
    {
        public void Configure(EntityTypeBuilder<Shares> builder)
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

