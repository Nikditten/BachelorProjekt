using FluentValidation;

namespace Application.Sessions.Commands.CreateSession
{
    public class CreateSessionCommandValidator : AbstractValidator<CreateSessionCommand>
    {
        public CreateSessionCommandValidator()
        {
            RuleFor(v => v.Key)
                .NotEmpty();

            RuleFor(v => v.DeviceWidth)
                .NotEmpty();

            RuleFor(v => v.Browser)
                .NotEmpty();

            RuleFor(v => v.Language)
                .NotEmpty();

            RuleFor(v => v.OS)
                .NotEmpty();

            RuleFor(v => v.Orientation)
                .NotEmpty();

            RuleFor(v => v.IsPWA)
                .NotNull();
        }
    }
}