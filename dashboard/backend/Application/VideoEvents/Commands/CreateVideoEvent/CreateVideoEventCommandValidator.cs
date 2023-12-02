
using FluentValidation;

namespace Application.VideoEvents.Commands.CreateVideoEvent
{
    public class CreateVideoEventCommandValidator : AbstractValidator<CreateVideoEventCommand>
    {
        public CreateVideoEventCommandValidator()
        {
            RuleFor(x => x.WebsiteKey)
                .NotEmpty();

            RuleFor(x => x.SessionID)
                .NotEmpty();

        }
    }
}