
using API.Services;
using API.Setups.JWT;
using Application.Common.Interfaces;

namespace API
{
	public static class ConfigureServices
    {
		public static void AddAPIServices(this IServiceCollection services)
		{
			services.AddScoped<IPasswordService, PasswordService>();
			services.AddScoped<ITokenService, TokenService>();

			services.ConfigureOptions<JwtOptionsSetup>();
            services.ConfigureOptions<JwtBearerOptionsSetup>();
        }
	}
}

