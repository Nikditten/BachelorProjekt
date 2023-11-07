using System;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
	public class AnalyticConfiguration : IEntityTypeConfiguration<Analytic>
    {
        public void Configure(EntityTypeBuilder<Analytic> builder)
        {
            builder
                .HasOne(x => x.Session)
                .WithMany(x => x.Analytics)
                .HasForeignKey(x => x.SessionId)
                .IsRequired(true);
        }
    }
}

