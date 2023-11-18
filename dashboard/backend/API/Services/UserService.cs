
using System.Security.Claims;
using Application.Common.Interfaces;

namespace API.Services
{
    // SOURCE: https://www.youtube.com/watch?v=7vqAHD9DlIA
    public class UserService : IUserService
    {

        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string? Id => _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
    }
}

