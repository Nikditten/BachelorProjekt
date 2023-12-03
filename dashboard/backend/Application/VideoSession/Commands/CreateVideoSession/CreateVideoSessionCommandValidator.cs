
using FluentValidation;

namespace Application.VideoEvents.Commands.CreateVideoSession
{
    public class CreateVideoSessionCommandValidator : AbstractValidator<CreateVideoSessionCommand>
    {
        public CreateVideoSessionCommandValidator()
        {
            RuleFor(x => x.WebsiteKey)
                .NotEmpty();

            RuleFor(x => x.SessionID)
                .NotEmpty();

            RuleFor(x => x.Source)
                .NotEmpty();

            RuleFor(x => x.Duration)
                .NotEmpty();

        }
    }
}