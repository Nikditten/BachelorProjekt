
using MediatR;

namespace Application.Websites.Commands.CreateWebsite
{
	public class CreateWebsiteCommand : IRequest<string>
	{
		public required string Name { get; set; }
	}
}

