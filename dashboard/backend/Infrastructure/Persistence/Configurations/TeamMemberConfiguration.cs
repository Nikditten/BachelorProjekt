using System;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
	public class TeamMemberConfiguration : IEntityTypeConfiguration<TeamMember>
    {
        public void Configure(EntityTypeBuilder<TeamMember> builder)
        {
            builder
                .HasOne(x => x.User)
                .WithMany(x => x.TeamMembers)
                .HasForeignKey(x => x.UserId)
                .IsRequired(true);

            builder
                .HasOne(x => x.Website)
                .WithMany(x => x.TeamMembers)
                .HasForeignKey(x => x.WebsiteId)
                .IsRequired(true);
        }
    }
}

