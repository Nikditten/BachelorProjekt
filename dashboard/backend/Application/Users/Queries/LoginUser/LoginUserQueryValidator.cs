
using Application.Users.Query.LoginUser;
using FluentValidation;

namespace Application.Users.Queries.LoginUser
{
	public class LoginUserQueryValidator : AbstractValidator<LoginUserQuery>
	{
		public LoginUserQueryValidator()
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

