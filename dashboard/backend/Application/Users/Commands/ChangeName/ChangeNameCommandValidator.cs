using FluentValidation;

namespace Application.Users.Commands.ChangeName
{
    public class ChangeNameCommandValidator : AbstractValidator<ChangeNameCommand>
    {
        public ChangeNameCommandValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}