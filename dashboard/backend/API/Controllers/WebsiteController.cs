using Application.DTOs;
using Application.Shares.Commands.ShareWebsite;
using Application.Websites.Commands.CreateWebsite;
using Application.Websites.Commands.DeleteWebsite;
using Application.Websites.Commands.UpdateWebsite;
using Application.Websites.Queries.GetWebsites;
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
        [HttpDelete("[action]")]
        public async Task<ActionResult<Unit>> Delete([FromQuery] DeleteWebsiteCommand command)
        {
            return await _mediator.Send(command);
        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<ActionResult<Unit>> Share([FromBody] ShareWebsiteCommand command)
        {
            return await _mediator.Send(command);
        }

        [Authorize]
        [HttpGet("[action]")]
        public async Task<ActionResult<List<WebsiteDTO>>> UserWebsites([FromQuery] GetWebsitesQuery query)
        {
            return await _mediator.Send(query);
        }

        [Authorize]
        [HttpPut("[action]")]
        public async Task<ActionResult<Unit>> Update([FromBody] UpdateWebsiteCommand command)
        {
            return await _mediator.Send(command);
        }
    }
}

