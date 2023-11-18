
using FluentValidation;

namespace Application.Websites.Commands.CreateWebsite
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

