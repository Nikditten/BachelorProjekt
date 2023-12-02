using System;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class NavigationEventConfiguration : IEntityTypeConfiguration<NavigationEvent>
    {
        public void Configure(EntityTypeBuilder<NavigationEvent> builder)
        {
            builder
                .HasOne(x => x.Session)
                .WithMany(x => x.NavigationEvents)
                .HasForeignKey(x => x.SessionId)
                .IsRequired(true);

        }
    }
}

