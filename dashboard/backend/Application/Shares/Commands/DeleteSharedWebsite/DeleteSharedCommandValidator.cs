using FluentValidation;

namespace Application.Shares.Commands.DeleteSharedWebsite
{
    public class DeleteSharedWebsiteCommandValidator : AbstractValidator<DeleteSharedWebsiteCommand>
    {
        public DeleteSharedWebsiteCommandValidator()
        {
            RuleFor(x => x.WebsiteId).NotEmpty();
        }
    }
}