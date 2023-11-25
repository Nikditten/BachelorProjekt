using FluentValidation;

namespace Application.Shares.Commands.ShareWebsite
{
    public class ShareWebsiteCommandValidator : AbstractValidator<ShareWebsiteCommand>
    {
        public ShareWebsiteCommandValidator()
        {
            RuleFor(x => x.Id)
            .NotEmpty();

            RuleFor(x => x.Username)
            .NotEmpty();
        }
    }
}