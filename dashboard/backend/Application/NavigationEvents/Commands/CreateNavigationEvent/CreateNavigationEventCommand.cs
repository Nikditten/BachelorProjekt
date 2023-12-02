using Domain.Enums;
using MediatR;

namespace Application.NavigationEvents.Commands.CreateNavigationEvent
{
    public class CreateNavigationEventCommand : IRequest<Unit>
    {
        public required Guid WebsiteKey { get; set; }
        public required Guid SessionID { get; set; }
        public required string URL { get; set; }
    }
}
