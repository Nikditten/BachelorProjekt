
using MediatR;

namespace Application.Websites.Commands.CreateWebsite
{
	public class CreateWebsiteCommand : IRequest<CreatedWebsiteDTO>
	{
		public required string Name { get; set; }
		public required string Url { get; set; }
	}
}

