
using Application.DTOs;
using MediatR;

namespace Application.Users.Queries.GetUser
{
    public class GetUserQuery : IRequest<UserDTO> { }
}