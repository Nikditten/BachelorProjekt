using FluentValidation;

namespace Application.Sessions.Commands.CreateSession
{
    public class CreateSessionCommandValidator : AbstractValidator<CreateSessionCommand>
    {
        public CreateSessionCommandValidator()
        {
            RuleFor(x => x.WebsiteKey)
                .NotEmpty();

            RuleFor(x => x.LandingPage)
                .NotEmpty();

            RuleFor(x => x.DeviceWidth)
                .NotEmpty();

            RuleFor(x => x.Browser)
                .NotEmpty();

            RuleFor(x => x.Language)
                .NotEmpty();

            RuleFor(x => x.Orientation)
                .NotNull();

            RuleFor(x => x.IsPWA)
                .NotNull();
        }
    }
}