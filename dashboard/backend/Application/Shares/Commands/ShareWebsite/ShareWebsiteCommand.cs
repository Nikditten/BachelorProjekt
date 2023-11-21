
using MediatR;

namespace Application.Shares.Commands.ShareWebsite
{
    public class ShareWebsiteCommand : IRequest<Unit>
    {
        public required Guid Id { get; set; }
        public required Guid UserId { get; set; }
    }
}
