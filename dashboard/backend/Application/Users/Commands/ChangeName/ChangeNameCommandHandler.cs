using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Commands.ChangeName
{
    public class ChangeNameCommandHandler : IRequestHandler<ChangeNameCommand, Unit>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IUserService _userService;

        public ChangeNameCommandHandler(IApplicationDbContext applicationDbContext, IUserService userService)
        {
            _applicationDbContext = applicationDbContext;
            _userService = userService;
        }
        public async Task<Unit> Handle(ChangeNameCommand request, CancellationToken cancellationToken)
        {
            Guid userId = _userService.Id;

            User? user = await _applicationDbContext.Users.FirstOrDefaultAsync(x => x.ID == userId, cancellationToken);

            if (user == null) throw new NullReferenceException("User does not exist");

            user.Name = request.Name;

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}