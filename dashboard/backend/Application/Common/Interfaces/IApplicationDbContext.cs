﻿using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces
{
	public interface IApplicationDbContext
	{
		Task<int> SaveChangesAsync(CancellationToken cancellationToken);

        DbSet<User> Users { get; set; }

		DbSet<TeamMember> TeamMembers { get; set; }

		DbSet<Website> Websites { get; set; }

		DbSet<Analytic> Analytics { get; set; }

		DbSet<Session> Sessions { get; set; }
	}
}

