
using Application.DTOs;
using Application.Users.Commands;
using Application.Users.Commands.LoginUser;
using Application.Users.Queries.GetUser;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {

        private readonly IMediator _mediator;

        public UserController(IMediator mediator) => _mediator = mediator;

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<ActionResult<string>> Create([FromBody] CreateUserCommand command)
        {
            return await _mediator.Send(command);
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public async Task<ActionResult<string>> Login([FromBody] LoginUserCommand command)
        {
            return await _mediator.Send(command);
        }

        [Authorize]
        [HttpGet("[action]")]
        public async Task<ActionResult<UserDTO>> Me([FromQuery] GetUserQuery query)
        {
            return await _mediator.Send(query);
        }
    }
}

