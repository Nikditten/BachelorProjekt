using MediatR;

namespace Application.Shares.Commands.DeleteSharedWebsite
{
    public class DeleteSharedWebsiteCommand : IRequest<Unit>
    {
        public required Guid WebsiteId { get; set; }
        public Guid? UserId { get; set; }
    }
}