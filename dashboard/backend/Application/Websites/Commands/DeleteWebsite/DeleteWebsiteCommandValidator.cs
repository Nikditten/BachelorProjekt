using FluentValidation;

namespace Application.Websites.Commands.DeleteWebsite
{
    public class DeleteWebsiteCommandValidator : AbstractValidator<DeleteWebsiteCommand>
    {
        public DeleteWebsiteCommandValidator()
        {
            RuleFor(x => x.WebsiteId)
                .NotEmpty();
        }
    }
}