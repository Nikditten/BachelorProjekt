using Application.DTOs;
using Application.Shares.Commands.DeleteSharedWebsite;
using Application.Shares.Commands.ShareWebsite;
using Application.Shares.Queries.GetUsers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [Route("api/dashboard/[controller]")]
    public class SharedController : Controller
    {
        private readonly IMediator _mediator;
        public SharedController(IMediator mediator) => _mediator = mediator;

        [Authorize]
        [HttpPost("[action]")]
        public async Task<ActionResult<UserDTO>> Create([FromBody] ShareWebsiteCommand command)
        {
            return await _mediator.Send(command);
        }

        [Authorize]
        [HttpDelete("[action]")]
        public async Task<ActionResult> Delete([FromBody] DeleteSharedWebsiteCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        [Authorize]
        [HttpGet("[action]")]
        public async Task<ActionResult<List<SharedUserDTO>>> GetUsers([FromQuery] GetUsersQuery query)
        {
            return await _mediator.Send(query);
        }

    }
}

