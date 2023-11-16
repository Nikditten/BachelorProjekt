using System;
namespace Application.Users.Commands.LoginUser
{
	public class LoginUserDTO
	{
		public required string Username { get; set; }

		public required string Password { get; set; }
	}
}

