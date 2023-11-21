using MediatR;

namespace Application.Users.Commands.ChangeName
{
    public class ChangeNameCommand : IRequest<Unit>
    {
        public required string Name { get; set; }
    }
}