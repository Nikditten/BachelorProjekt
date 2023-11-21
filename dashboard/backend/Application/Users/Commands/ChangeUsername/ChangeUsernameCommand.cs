using MediatR;

// SOURCE: https://code-maze.com/cqrs-mediatr-in-aspnet-core/
namespace Application.Users.Commands.ChangeUsername
{
    public class ChangeUsernameCommand : IRequest<Unit>
    {
        public required string Username { get; set; }
    }
}

