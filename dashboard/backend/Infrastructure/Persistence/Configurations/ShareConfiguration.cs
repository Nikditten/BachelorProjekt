using System;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
	public class SharesConfiguration : IEntityTypeConfiguration<Share>
    {
        public void Configure(EntityTypeBuilder<Share> builder)
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

