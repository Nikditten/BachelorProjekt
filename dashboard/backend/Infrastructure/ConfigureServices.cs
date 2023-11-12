using Application.Common.Interfaces;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
	public static class ConfigureServices
    {
		public static void AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
		{
            // SOURCE: https://www.npgsql.org/efcore/index.html
            services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<IApplicationDbContext, ApplicationDbContext>();
        }
    }
}

