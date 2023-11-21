using MediatR;

namespace Application.Users.Commands.ChangePassword
{
    public class ChangePasswordCommand : IRequest<Unit>
    {
        public required string OldPassword { get; set; }
        public required string NewPassword { get; set; }
        public required string ConfirmPassword { get; set; }
    }
}