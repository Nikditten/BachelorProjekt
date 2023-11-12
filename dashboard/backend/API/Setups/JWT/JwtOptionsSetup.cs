
using API.Options;
using Microsoft.Extensions.Options;

namespace API.Setups.JWT
{
    // SOURCE: https://www.youtube.com/watch?v=4cFhYUK8wnc&list=PLYpjLpq5ZDGtJOHUbv7KHuxtYLk1nJPw5
    public class JwtOptionsSetup : IConfigureOptions<JwtOptions>
	{

        private readonly IConfiguration _configuration;

        public JwtOptionsSetup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void Configure(JwtOptions options)
        {
            _configuration.GetSection(JwtOptions.SectionName).Bind(options);
        }
    }
}

