
using Domain.Entities;
using MediatR;

namespace Application.Users.Queries.GetUser
{
    public class GetUserQuery : IRequest<GetUserDTO> { }
}