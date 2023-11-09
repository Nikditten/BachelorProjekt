
using API.Services;
using Application.Common.Interfaces;

namespace API
{
	public static class DependencyInjection
	{
		public static void AddAPIServices(this IServiceCollection services)
		{
			services.AddScoped<IPasswordService, PasswordService>();
			services.AddScoped<ITokenService, TokenService>();
		}
	}
}

