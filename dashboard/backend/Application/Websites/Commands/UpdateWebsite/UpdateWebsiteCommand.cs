using MediatR;

namespace Application.Websites.Commands.UpdateWebsite
{
    public class UpdateWebsiteCommand : IRequest<Unit>
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Url { get; set; }
    }
}