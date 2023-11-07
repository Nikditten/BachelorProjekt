using System;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
	public class SessionConfiguration : IEntityTypeConfiguration<Session>
    {
        public void Configure(EntityTypeBuilder<Session> builder)
        {
            builder
                .HasOne(x => x.Website)
                .WithMany(x => x.Sessions)
                .HasForeignKey(x => x.WebsiteId)
                .IsRequired(true);

            builder
                .HasMany(x => x.Analytics)
                .WithOne(x => x.Session)
                .HasForeignKey(x => x.SessionId)
                .IsRequired(true);
        }
    }
}

