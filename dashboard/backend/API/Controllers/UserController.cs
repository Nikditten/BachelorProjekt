
using Application.DTOs;
using Application.Users.Commands.CreateUser;
using Application.Users.Queries.LoginUser;
using Application.Users.Commands.ChangeUsername;
using Application.Users.Queries.GetUser;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Users.Commands.ChangePassword;
using Application.Users.Commands.ChangeName;


namespace API.Controllers
{
    [Route("api/dashboard/[controller]")]
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
        [HttpPost("[action]")]
        public async Task<ActionResult<string>> Login([FromBody] LoginUserQuery query)
        {
            return await _mediator.Send(query);
        }

        [Authorize]
        [HttpGet("[action]")]
        public async Task<ActionResult<UserDTO>> Me([FromQuery] GetUserQuery query)
        {
            return await _mediator.Send(query);
        }

        [Authorize]
        [HttpPut("[action]")]
        public async Task<ActionResult> Username([FromBody] ChangeUsernameCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        [Authorize]
        [HttpPut("[action]")]
        public async Task<ActionResult> Password([FromBody] ChangePasswordCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        [Authorize]
        [HttpPut("[action]")]
        public async Task<ActionResult> Name([FromBody] ChangeNameCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }
    }
}

