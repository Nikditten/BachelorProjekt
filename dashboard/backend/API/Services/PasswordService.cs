using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using Application.Common.Interfaces;

// SOURCE: https://learn.microsoft.com/en-us/aspnet/core/security/data-protection/consumer-apis/password-hashing?view=aspnetcore-7.0
namespace API.Services
{
    public class PasswordService : IPasswordService
    {
        public byte[] GenerateSalt()
        {
            byte[] salt = RandomNumberGenerator.GetBytes(128 / 8);

            return salt;
        }

        public string HashPassword(string password, byte[] salt)
        {
            string hashPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 1000,
                numBytesRequested: 256 / 8
                ));

            return hashPassword;
        }

        public bool VerifyPassword(string password, string hashPassword, byte[] salt)
        {
            return HashPassword(password, salt) == hashPassword;
        }
    }
}

