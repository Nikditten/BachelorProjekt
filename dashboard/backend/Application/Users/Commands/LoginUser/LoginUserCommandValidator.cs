
using Application.Users.Commands.LoginUser;
using FluentValidation;

namespace Application.Users.Commands.LoginUser
{
	public class LoginUserCommandValidator : AbstractValidator<LoginUserCommand>
	{
		public LoginUserCommandValidator()
		{
			RuleFor(x => x.Username)
				.NotEmpty();

			RuleFor(x => x.Password)
				.NotEmpty();
		}
	}
}

