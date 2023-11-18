
using MediatR;

namespace Application.Websites.Commands
{
	public class CreateWebsiteCommand : CreateWebsiteDTO, IRequest<string> {}
}

