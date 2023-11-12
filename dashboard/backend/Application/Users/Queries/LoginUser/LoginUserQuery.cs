
using MediatR;

namespace Application.Users.Query.LoginUser
{
	public class LoginUserQuery : LoginUserDTO, IRequest<string> { }
}

