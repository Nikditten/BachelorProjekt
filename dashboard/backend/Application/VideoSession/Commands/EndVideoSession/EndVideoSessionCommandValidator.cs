
using FluentValidation;

namespace Application.VideoEvents.Commands.PauseVideoSession
{
    public class EndVideoSessionCommandValidator : AbstractValidator<PauseVideoSessionCommand>
    {
        public EndVideoSessionCommandValidator()
        {
            RuleFor(x => x.WebsiteKey)
                .NotEmpty();

            RuleFor(x => x.SessionID)
                .NotEmpty();

            RuleFor(x => x.VideoSessionID)
                .NotEmpty();

            RuleFor(x => x.Duration)
                .NotEmpty();

        }
    }
}