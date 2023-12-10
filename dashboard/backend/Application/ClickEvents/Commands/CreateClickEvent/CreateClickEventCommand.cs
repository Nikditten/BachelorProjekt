using Domain.Enums;
using MediatR;

namespace Application.ClickEvents.Commands.CreateClickEvent
{
    public class CreateClickEventCommand : IRequest<Unit>
    {
        public required Guid WebsiteKey { get; set; }
        public required Guid SessionID { get; set; }
        public string? ElementID { get; set; }
        public required string ElementText { get; set; }
        public required string ElementType { get; set; }
        public string? URL { get; set; }
    }
}
