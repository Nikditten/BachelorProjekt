using System;
namespace Application.Users.Commands
{
    public class CreateUserDTO
    {
        public required string Name { get; set; }

        public required string Username { get; set; }

        public required string Password { get; set; }
    }
}

