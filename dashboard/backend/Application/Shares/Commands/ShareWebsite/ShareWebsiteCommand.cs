
using Application.DTOs;
using MediatR;

namespace Application.Shares.Commands.ShareWebsite
{
    public class ShareWebsiteCommand : IRequest<UserDTO>
    {
        public required Guid Id { get; set; }
        public required string Username { get; set; }
    }
}

