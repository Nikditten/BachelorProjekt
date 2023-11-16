using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Users.Commands;
using Application.Users.Query;
using Application.Users.Query.LoginUser;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [Route("api/[controller]")]
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
        [HttpGet("[action]")]
        public async Task<ActionResult<string>> Login([FromBody] LoginUserQuery query)
        {
            return await _mediator.Send(query);
        }
    }
}

