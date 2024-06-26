﻿
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
				.NotEmpty();
		}
	}
}

