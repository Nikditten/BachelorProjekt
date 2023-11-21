using FluentValidation;

namespace Application.Users.Commands.ChangePassword
{
    public class ChangePasswordCommandValidator : AbstractValidator<ChangePasswordCommand>
    {
        public ChangePasswordCommandValidator()
        {
            RuleFor(x => x.OldPassword).NotEmpty();

            RuleFor(x => x.NewPassword)
                .NotEmpty()
                .NotEqual(x => x.OldPassword)
                .MinimumLength(8)
                .Must(y => y.Any(char.IsDigit))
                .WithMessage("Must include at least one number")
                .Must(y => y.Any(char.IsLower))
                .WithMessage("Must include at least one lower case")
                .Must(y => y.Any(char.IsUpper))
                .WithMessage("Must include at least one upper case");

            RuleFor(x => x.ConfirmPassword).Equal(x => x.NewPassword);
        }
    }
}