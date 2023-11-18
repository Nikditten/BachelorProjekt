using MediatR;

// SOURCE: https://code-maze.com/cqrs-mediatr-in-aspnet-core/
namespace Application.Users.Commands
{
    public class CreateUserCommand : IRequest<string>
    {
        public required string Name { get; set; }

        public required string Username { get; set; }

        public required string Password { get; set; }
    }
}

