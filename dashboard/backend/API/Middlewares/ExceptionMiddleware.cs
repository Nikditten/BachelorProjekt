using System;
using Application.Common.Exceptions;
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
            catch (Exception exception)
            {
                var exceptionType = exception.GetType();

                int statusCode;

                switch (exception)
                {
                    case UnauthorizedAccessException:
                        statusCode = StatusCodes.Status401Unauthorized;
                        break;
                    case NullReferenceException:
                        statusCode = StatusCodes.Status404NotFound;
                        break;
                    case ArgumentException:
                        statusCode = StatusCodes.Status400BadRequest;
                        break;
                    case ValidationException:
                        statusCode = StatusCodes.Status400BadRequest;
                        break;
                    case AlreadyExistsException:
                        statusCode = StatusCodes.Status409Conflict;
                        break;
                    default:
                        statusCode = StatusCodes.Status500InternalServerError;
                        break;
                }

                var problemDetails = new ProblemDetails
                {
                    Status = statusCode,
                    Type = exceptionType.Name,
                    Title = "An error occurred",
                    Detail = exceptionType == typeof(ValidationException) ? "One or more validation errors occurred." : exception.Message,
                };

                if (exception is ValidationException validationException)
                {
                    problemDetails.Extensions["errors"] = validationException.Errors.Select(x => new { field = x.PropertyName, error = x.ErrorMessage }).ToList();
                }
                context.Response.StatusCode = statusCode;

                await context.Response.WriteAsJsonAsync(problemDetails);
            }
        }
    }
}

