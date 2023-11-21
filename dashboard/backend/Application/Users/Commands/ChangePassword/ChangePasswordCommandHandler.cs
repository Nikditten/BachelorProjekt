using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Commands.ChangePassword
{
    public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, Unit>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IUserService _userService;
        private readonly IPasswordService _passwordService;

        public ChangePasswordCommandHandler(IApplicationDbContext applicationDbContext, IUserService userService, IPasswordService passwordService)
        {
            _applicationDbContext = applicationDbContext;
            _userService = userService;
            _passwordService = passwordService;
        }

        public async Task<Unit> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
        {
            var userId = new Guid(_userService.Id);

            User? user = await _applicationDbContext.Users.FirstOrDefaultAsync(x => x.ID == userId, cancellationToken);

            if (user is null) throw new NullReferenceException("User does not exist");

            if (!_passwordService.VerifyPassword(request.OldPassword, user.HashedPassword, user.Salt))
                throw new WrongPasswordException("Wrong password");

            byte[] salt = _passwordService.GenerateSalt();

            user.HashedPassword = _passwordService.HashPassword(request.NewPassword, salt);
            user.Salt = salt;

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}