using Application.AnalyticsData.Queries.GetAnalyticsData;
using Application.DTOs;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [Route("api/dashboard/[controller]")]
    public class AnalyticsDataController : Controller
    {
        private readonly IMediator _mediator;
        public AnalyticsDataController(IMediator mediator) => _mediator = mediator;

        [Authorize]
        [HttpGet("[action]")]
        public async Task<ActionResult<AnalyticsDataDTO>> Get([FromQuery] GetAnalyticsDataQuery query)
        {
            return await _mediator.Send(query);
        }

    }
}

