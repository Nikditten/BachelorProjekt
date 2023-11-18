
using MediatR;

namespace Application.Users.Commands.LoginUser
{
	public class LoginUserCommand : IRequest<string>
	{
		public required string Username { get; set; }

		public required string Password { get; set; }
	}
}

