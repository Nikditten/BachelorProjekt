using System;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class WebsiteConfiguration : IEntityTypeConfiguration<Website>
    {
        public void Configure(EntityTypeBuilder<Website> builder)
        {
            builder
                .HasMany(x => x.Shares)
                .WithOne(x => x.Website)
                .HasForeignKey(x => x.WebsiteId)
                .IsRequired(true);

            builder
                .HasMany(x => x.Sessions)
                .WithOne(x => x.Website)
                .HasForeignKey(x => x.WebsiteId)
                .IsRequired(true);
        }
    }
}

