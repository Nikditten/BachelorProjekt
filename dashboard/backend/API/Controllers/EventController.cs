using Application.ClickEvents.Commands.CreateClickEvent;
using Application.NavigationEvents.Commands.CreateNavigationEvent;
using Application.VideoSessions.Commands.CreateVideoSession;
using Application.VideoSessions.Commands.EndVideoSession;
using Application.VideoSessions.Commands.PauseVideoSession;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [Route("api/collector/[controller]")]
    public class EventController : Controller
    {
        private readonly IMediator _mediator;
        public EventController(IMediator mediator) => _mediator = mediator;

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<ActionResult> CreateClickEvent([FromBody] CreateClickEventCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<ActionResult> CreateNavigationEvent([FromBody] CreateNavigationEventCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<ActionResult<Guid>> CreateVideoSession([FromBody] CreateVideoSessionCommand command)
        {
            return await _mediator.Send(command);
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<ActionResult> PauseVideoSession([FromBody] PauseVideoSessionCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<ActionResult> EndVideoSession([FromBody] EndVideoSessionCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

    }
}

