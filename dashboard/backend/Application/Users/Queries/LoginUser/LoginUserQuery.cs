
using MediatR;

namespace Application.Users.Queries.LoginUser
{
	public class LoginUserQuery : IRequest<string>
	{
		public required string Username { get; set; }

		public required string Password { get; set; }
	}
}

