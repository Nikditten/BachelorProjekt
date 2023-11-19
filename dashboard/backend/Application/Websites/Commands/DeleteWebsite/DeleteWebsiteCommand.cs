using MediatR;

namespace Application.Websites.Commands.DeleteWebsite
{
    public class DeleteWebsiteCommand : IRequest<Unit>
    {
        public Guid WebsiteId { get; set; }
    }
}