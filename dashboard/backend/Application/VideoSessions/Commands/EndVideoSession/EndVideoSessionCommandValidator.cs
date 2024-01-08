
using FluentValidation;

namespace Application.VideoSessions.Commands.EndVideoSession
{
    public class EndVideoSessionCommandValidator : AbstractValidator<EndVideoSessionCommand>
    {
        public EndVideoSessionCommandValidator()
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