using Application.ClickEvents.Commands.CreateClickEvent;
using FluentValidation;

namespace Application.Sessions.Commands.CreateSession
{
    public class CreateClickEventCommandValidator : AbstractValidator<CreateClickEventCommand>
    {
        public CreateClickEventCommandValidator()
        {
            RuleFor(x => x.WebsiteKey)
                .NotEmpty();

            RuleFor(x => x.SessionID)
                .NotEmpty();

            RuleFor(x => x.ElementType)
                .NotEmpty();

            RuleFor(x => x.ElementText)
                .NotEmpty();

        }
    }
}