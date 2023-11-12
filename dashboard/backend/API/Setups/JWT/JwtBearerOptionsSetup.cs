using System;
using System.Text;
using API.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace API.Setups.JWT
{
    // SOURCE: https://www.youtube.com/watch?v=4cFhYUK8wnc&list=PLYpjLpq5ZDGtJOHUbv7KHuxtYLk1nJPw5
    public class JwtBearerOptionsSetup : IConfigureOptions<JwtBearerOptions>
	{

        private readonly JwtOptions _jwtOptions;

		public JwtBearerOptionsSetup(IOptions<JwtOptions> jwtOptions)
		{
            _jwtOptions = jwtOptions.Value;
		}

        public void Configure(JwtBearerOptions options)
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = _jwtOptions.Issuer,
                ValidAudience = _jwtOptions.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Key))
            };
        }
    }
}

