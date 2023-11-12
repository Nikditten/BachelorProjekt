
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

// SOURCE: https://code-maze.com/cqrs-mediatr-in-aspnet-core/
namespace Application.Users.Commands
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, string>
    {

        private readonly IApplicationDbContext _applicationDbContext;

        private readonly IPasswordService _passwordService;

        private readonly ITokenService _tokenService;

        public CreateUserCommandHandler(IApplicationDbContext applicationDbContext, IPasswordService passwordService, ITokenService tokenService)
        {
            _applicationDbContext = applicationDbContext;
            _passwordService = passwordService;
            _tokenService = tokenService;
        }

        public async Task<string> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            User? existingUser = await _applicationDbContext.Users.FirstOrDefaultAsync(x => x.Username == request.Username, cancellationToken);

            if (existingUser != null) throw new HttpRequestException();

            byte[] salt = _passwordService.GenerateSalt();

            string hashPassword = _passwordService.HashPassword(password: request.Password, salt);

            User user = new User { Name = request.Name, Username = request.Username, HashedPassword = hashPassword, Salt = salt };

            _applicationDbContext.Users.Add(user);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return _tokenService.CreateToken(user);
        }
    }
}

