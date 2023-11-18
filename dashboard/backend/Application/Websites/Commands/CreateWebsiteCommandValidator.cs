

using FluentValidation;

namespace Application.Websites.Commands
{
	public class CreateWebsiteCommandValidator : AbstractValidator<CreateWebsiteCommand>
    {
		public CreateWebsiteCommandValidator()
		{
			RuleFor(x => x.Name)
				.NotEmpty();
		}
	}
}

