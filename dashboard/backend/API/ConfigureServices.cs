
using API.Options;
using API.Services;
using Application.Common.Interfaces;

namespace API
{
	public static class ConfigureServices
	{
		public static void AddAPIServices(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddScoped<IPasswordService, PasswordService>();
			services.AddScoped<ITokenService, TokenService>();

			services.AddHttpContextAccessor();

			services.AddScoped<IUserService, UserService>();

			services.Configure<JwtOptions>(configuration.GetSection(JwtOptions.SectionName));
		}
	}
}

