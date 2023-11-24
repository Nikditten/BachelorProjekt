using Application.DTOs;
using Application.Shares.Commands.DeleteSharedWebsite;
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
    public class SharedController : Controller
    {
        private readonly IMediator _mediator;
        public SharedController(IMediator mediator) => _mediator = mediator;

        [Authorize]
        [HttpPost("[action]")]
        public async Task<ActionResult<Unit>> Create([FromBody] ShareWebsiteCommand command)
        {
            return await _mediator.Send(command);
        }
        [Authorize]
        [HttpDelete("[action]")]
        public async Task<ActionResult<Unit>> Delete([FromBody] DeleteSharedWebsiteCommand command)
        {
            return await _mediator.Send(command);
        }

    }
}

