
using FluentValidation;

namespace Application.VideoSessions.Commands.PauseVideoSession
{
    public class PauseVideoSessionCommandValidator : AbstractValidator<PauseVideoSessionCommand>
    {
        public PauseVideoSessionCommandValidator()
        {
            RuleFor(x => x.WebsiteKey)
                .NotEmpty();

            RuleFor(x => x.VideoSessionID)
                .NotEmpty();

            RuleFor(x => x.Duration)
                .NotEmpty();

        }
    }
}