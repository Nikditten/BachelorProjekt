using Application.Users.Commands.ChangeUsername;
using FluentValidation;

namespace Application.Users.Commands.ChangeName
{
    public class ChangeUsernameCommandValidator : AbstractValidator<ChangeUsernameCommand>
    {
        public ChangeUsernameCommandValidator()
        {
            RuleFor(x => x.Username).NotEmpty();
        }
    }
}