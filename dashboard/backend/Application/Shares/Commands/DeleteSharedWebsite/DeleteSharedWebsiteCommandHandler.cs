using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Shares.Commands.DeleteSharedWebsite
{
    public class DeleteSharedWebsiteCommandHandler : IRequestHandler<DeleteSharedWebsiteCommand, Unit>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IUserService _userService;

        public DeleteSharedWebsiteCommandHandler(IApplicationDbContext context, IUserService userService)
        {
            _applicationDbContext = context;
            _userService = userService;
        }

        public async Task<Unit> Handle(DeleteSharedWebsiteCommand request, CancellationToken cancellationToken)
        {

            Guid userId = _userService.Id;

            if (request.UserId != null)
            {
                userId = request.UserId.Value;
            }

            var sharedWebsite = await _applicationDbContext.Shares.FirstOrDefaultAsync(x => x.UserId == userId && x.WebsiteId == request.WebsiteId, cancellationToken);

            if (sharedWebsite == null)
            {
                throw new NullReferenceException("Shared website not found");
            }

            _applicationDbContext.Shares.Remove(sharedWebsite);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}