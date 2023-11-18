using Application.Shares.Commands.ShareWebsite;
using Application.Websites.Commands.CreateWebsite;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [Route("api/[controller]")]
    public class WebsiteController : Controller
    {
        private readonly IMediator _mediator;
        public WebsiteController(IMediator mediator) => _mediator = mediator;

        [Authorize]
        [HttpPost("[action]")]
        public async Task<ActionResult<string>> Create([FromBody] CreateWebsiteCommand command)
        {
            return await _mediator.Send(command);
        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<ActionResult<Unit>> Share([FromBody] ShareWebsiteCommand command)
        {
            return await _mediator.Send(command);
        }
    }
}

