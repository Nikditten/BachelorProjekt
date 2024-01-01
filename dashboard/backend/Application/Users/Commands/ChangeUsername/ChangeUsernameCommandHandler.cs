
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Commands.ChangeUsername
{
    public class ChangeUsernameCommandHandler : IRequestHandler<ChangeUsernameCommand, Unit>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IUserService _userService;

        public ChangeUsernameCommandHandler(IApplicationDbContext applicationDbContext, IUserService userService)
        {
            _applicationDbContext = applicationDbContext;
            _userService = userService;
        }
        public async Task<Unit> Handle(ChangeUsernameCommand request, CancellationToken cancellationToken)
        {
            Guid userId = _userService.Id;

            User? user = await _applicationDbContext.Users.FirstOrDefaultAsync(x => x.ID == userId, cancellationToken);

            if (user == null) throw new NullReferenceException("User does not exist");

            user.Username = request.Username;

            user.UpdatedAt = DateTime.UtcNow;

            _applicationDbContext.Users.Update(user);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}