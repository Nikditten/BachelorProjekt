
using MediatR;

namespace Application.Users.Commands.LoginUser
{
	public class LoginUserCommand : LoginUserDTO, IRequest<string> { }
}

