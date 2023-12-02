using FluentValidation;

namespace Application.NavigationEvents.Commands.CreateNavigationEvent
{
    public class CreateNavigationEventCommandValidator : AbstractValidator<CreateNavigationEventCommand>
    {
        public CreateNavigationEventCommandValidator()
        {
            RuleFor(x => x.WebsiteKey)
                .NotEmpty();

            RuleFor(x => x.SessionID)
                .NotEmpty();

            RuleFor(x => x.URL)
                .NotEmpty();

        }
    }
}