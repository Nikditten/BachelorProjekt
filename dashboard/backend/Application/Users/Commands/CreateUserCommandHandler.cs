
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

// SOURCE: https://code-maze.com/cqrs-mediatr-in-aspnet-core/
namespace Application.Users.Commands
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Guid>
    {

        private readonly IApplicationDbContext _applicationDbContext;

        private readonly IPasswordService _passwordService;

        public CreateUserCommandHandler(IApplicationDbContext applicationDbContext, IPasswordService passwordService)
        {
            _applicationDbContext = applicationDbContext;
            _passwordService = passwordService;
        }

        public async Task<Guid> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            byte[] salt = _passwordService.GenerateSalt();

            string hashPassword = _passwordService.HashPassword(password: request.Password, salt);

            User user = new User { Name = request.Name, Username = request.Username, HashedPassword = hashPassword, Salt = salt };

            _applicationDbContext.Users.Add(user);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return user.ID;
        }
    }
}

