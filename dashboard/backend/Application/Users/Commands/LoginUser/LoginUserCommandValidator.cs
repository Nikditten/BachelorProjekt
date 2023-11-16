
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
                .NotEmpty()
                .MinimumLength(8)
                .Must(y => y.Any(char.IsDigit))
                .Must(y => y.Any(char.IsLower))
                .Must(y => y.Any(char.IsUpper));
        }
	}
}

