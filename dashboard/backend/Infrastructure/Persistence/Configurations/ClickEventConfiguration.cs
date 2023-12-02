using System;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class ClickEventConfiguration : IEntityTypeConfiguration<ClickEvent>
    {
        public void Configure(EntityTypeBuilder<ClickEvent> builder)
        {
            builder
                .HasOne(x => x.Session)
                .WithMany(x => x.ClickEvents)
                .HasForeignKey(x => x.SessionId)
                .IsRequired(true);

        }
    }
}

