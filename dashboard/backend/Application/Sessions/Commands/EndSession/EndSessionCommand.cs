using Domain.Enums;
using MediatR;

namespace Application.Sessions.Commands.EndSession
{
    public class EndSessionCommand : IRequest<Unit>
    {
        public required Guid WebsiteKey { get; set; }
        public required Guid SessionID { get; set; }
    }
}
