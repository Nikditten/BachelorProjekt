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
    [Route("api/dashboard/[controller]")]
    public class WebsiteController : Controller
    {
        private readonly IMediator _mediator;
        public WebsiteController(IMediator mediator) => _mediator = mediator;

        [Authorize]
        [HttpPost("[action]")]
        public async Task<ActionResult<CreatedWebsiteDTO>> Create([FromBody] CreateWebsiteCommand command)
        {
            return await _mediator.Send(command);
        }

        [Authorize]
        [HttpDelete("[action]")]
        public async Task<ActionResult> Delete([FromQuery] DeleteWebsiteCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        [Authorize]
        [HttpGet("[action]")]
        public async Task<ActionResult<List<UserWebsiteDTO>>> UserWebsites([FromQuery] GetWebsitesQuery query)
        {
            return await _mediator.Send(query);
        }

        [Authorize]
        [HttpPut("[action]")]
        public async Task<ActionResult> Update([FromBody] UpdateWebsiteCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

    }
}

