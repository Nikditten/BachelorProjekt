using FluentValidation;

namespace Application.Sessions.Commands.EndSession
{
    public class EndSessionCommandValidator : AbstractValidator<EndSessionCommand>
    {
        public EndSessionCommandValidator()
        {
            RuleFor(x => x.WebsiteKey)
                .NotEmpty();

            RuleFor(x => x.SessionID)
                .NotEmpty();
        }
    }
}