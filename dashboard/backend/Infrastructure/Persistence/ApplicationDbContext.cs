
using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder) => base.OnModelCreating(modelBuilder);

        public DbSet<User> Users { get; set; }
        public DbSet<TeamMember> TeamMembers { get; set; }
        public DbSet<Website> Websites { get; set; }
        public DbSet<Analytic> Analytics { get; set; }
        public DbSet<Session> Sessions { get; set; }
    }
}

