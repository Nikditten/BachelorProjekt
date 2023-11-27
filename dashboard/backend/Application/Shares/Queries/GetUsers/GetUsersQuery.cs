
using Domain.Entities;
using MediatR;

namespace Application.Shares.Queries.GetUsers
{
    public class GetUsersQuery : IRequest<List<SharedUserDTO>>
    {
        public required Guid WebsiteId { get; set; }
    }
}