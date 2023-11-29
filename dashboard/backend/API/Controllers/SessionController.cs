using Application.Sessions.Commands.CreateSession;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [Route("api/[controller]")]
    public class SessionController : Controller
    {
        private readonly IMediator _mediator;
        public SessionController(IMediator mediator) => _mediator = mediator;

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<ActionResult<Guid>> Create([FromBody] CreateSessionCommand command)
        {
            return await _mediator.Send(command);
        }

    }
}

