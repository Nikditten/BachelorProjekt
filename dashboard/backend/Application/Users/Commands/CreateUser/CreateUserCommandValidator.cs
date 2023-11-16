
using FluentValidation;

namespace Application.Users.Commands.CreateUser
{
    public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
    {
        public CreateUserCommandValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty();

            RuleFor(x => x.Username)
                .NotEmpty()
                .MinimumLength(4);

            RuleFor(x => x.Password)
                .NotEmpty()
                .MinimumLength(8)
                .Must(y => y.Any(char.IsDigit))
                .WithMessage("Must include at least one number")
                .Must(y => y.Any(char.IsLower))
                .WithMessage("Must include at least one lower case")
                .Must(y => y.Any(char.IsUpper))
                .WithMessage("Must include at least one upper case");
        }
    }
}

