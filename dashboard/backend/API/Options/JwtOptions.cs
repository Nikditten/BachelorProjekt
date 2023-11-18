
namespace API.Options
{
    // SOURCE: https://www.youtube.com/watch?v=4cFhYUK8wnc&list=PLYpjLpq5ZDGtJOHUbv7KHuxtYLk1nJPw5
    public class JwtOptions
    {
        public static string SectionName = "JwtSettings";

        public string Issuer { get; set; }

        public string Audience { get; set; }

        public string Key { get; set; }

        public double Lifetime { get; set; }
    }
}

