using System;
namespace Application.Common.Interfaces
{
	public interface IPasswordService
	{
		byte[] GenerateSalt();

		string HashPassword(string password, byte[] salt);

		bool VerifyPassword(string password, string hashPassword, byte[] salt);
	}
}

