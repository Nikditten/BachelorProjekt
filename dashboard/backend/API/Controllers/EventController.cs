using Application.ClickEvents.Commands.CreateClickEvent;
using Application.NavigationEvents.Commands.CreateNavigationEvent;
using Application.VideoEvents.Commands.CreateVideoSession;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [Route("api/[controller]")]
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
        public async Task<ActionResult> CreateVideoSession([FromBody] CreateVideoSessionCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<ActionResult> PauseVideoSession([FromBody] CreateVideoSessionCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<ActionResult> EndVideoSession([FromBody] CreateVideoSessionCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

    }
}

