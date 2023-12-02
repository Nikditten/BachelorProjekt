
using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {

        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return base.SaveChangesAsync(cancellationToken);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Shared> Shares { get; set; }
        public DbSet<Website> Websites { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<ClickEvent> ClickEvents { get; set; }
        public DbSet<NavigationEvent> NavigationEvents { get; set; }
        public DbSet<VideoEvent> VideoEvents { get; set; }
    }
}

