using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces
{
	public interface IApplicationDbContext
	{
		Task<int> SaveChangesAsync(CancellationToken cancellationToken);
		DbSet<User> Users { get; set; }
		DbSet<Shared> Shares { get; set; }
		DbSet<Website> Websites { get; set; }
		DbSet<Session> Sessions { get; set; }
		DbSet<ClickEvent> ClickEvents { get; set; }
		DbSet<NavigationEvent> NavigationEvents { get; set; }
		DbSet<VideoEvent> VideoEvents { get; set; }
	}
}

