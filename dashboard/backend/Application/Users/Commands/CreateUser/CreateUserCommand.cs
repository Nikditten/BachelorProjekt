using Domain.Entities;
using MediatR;

// SOURCE: https://code-maze.com/cqrs-mediatr-in-aspnet-core/
namespace Application.Users.Commands
{
    public class CreateUserCommand : CreateUserDTO, IRequest<string> {}
}

