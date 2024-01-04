
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Queries.LoginUser
{
    public class LoginUserQueryHandler : IRequestHandler<LoginUserQuery, string>
    {

        private readonly IApplicationDbContext _applicationDbContext;

        private readonly IPasswordService _passwordService;

        private readonly ITokenService _tokenService;

        public LoginUserQueryHandler(IApplicationDbContext applicationDbContext, IPasswordService passwordService, ITokenService tokenService)
        {
            _applicationDbContext = applicationDbContext;

            _passwordService = passwordService;

            _tokenService = tokenService;
        }

        public async Task<string> Handle(LoginUserQuery request, CancellationToken cancellationToken)
        {
            User? user = await _applicationDbContext.Users.FirstOrDefaultAsync(x => x.Username == request.Username, cancellationToken);

            if (user == null) throw new NullReferenceException("User does not exist");

            bool samePassword = _passwordService.VerifyPassword(request.Password, user.HashedPassword, user.Salt);

            if (!samePassword) throw new WrongPasswordException("Wrong password");

            return _tokenService.CreateToken(user);
        }
    }
}

