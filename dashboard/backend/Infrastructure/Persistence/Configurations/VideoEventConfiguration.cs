using System;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class VideoEventConfiguration : IEntityTypeConfiguration<VideoEvent>
    {
        public void Configure(EntityTypeBuilder<VideoEvent> builder)
        {
            builder
                .HasOne(x => x.Session)
                .WithMany(x => x.VideoEvents)
                .HasForeignKey(x => x.SessionId)
                .IsRequired(true);

        }
    }
}

