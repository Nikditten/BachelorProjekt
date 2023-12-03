using System;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class VideoSessionConfiguration : IEntityTypeConfiguration<VideoSession>
    {
        public void Configure(EntityTypeBuilder<VideoSession> builder)
        {
            builder
                .HasOne(x => x.Session)
                .WithMany(x => x.VideoSessions)
                .HasForeignKey(x => x.SessionId)
                .IsRequired(true);

            builder
                .HasMany(x => x.VideoEvents)
                .WithOne(x => x.VideoSession)
                .HasForeignKey(x => x.VideoSessionId)
                .IsRequired(true);

        }
    }
}

