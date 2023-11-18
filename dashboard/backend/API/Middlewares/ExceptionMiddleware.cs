using System;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Middlewares
{
    // SOURCE: https://www.milanjovanovic.tech/blog/cqrs-validation-with-mediatr-pipeline-and-fluentvalidation
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (ValidationException exception)
            {
                var problemDetails = new ProblemDetails
                {
                    Status = StatusCodes.Status400BadRequest,
                    Type = "ValidationException",
                    Title = "Validation error",
                    Detail = "One or more validation errors has occurred"
                };

                if (exception.Errors is not null)
                {
                    problemDetails.Extensions["errors"] = exception.Errors.Select(x => new { field = x.PropertyName, error = x.ErrorMessage }).ToList();
                }

                context.Response.StatusCode = StatusCodes.Status400BadRequest;

                await context.Response.WriteAsJsonAsync(problemDetails);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);

                var problemDetails = new ProblemDetails
                {
                    Status = StatusCodes.Status500InternalServerError,
                    Type = "Exception",
                    Title = "Error",
                    Detail = "An internal error has occured",
                };

                context.Response.StatusCode = StatusCodes.Status500InternalServerError;

                await context.Response.WriteAsJsonAsync(problemDetails);
            }
        }
    }
}

