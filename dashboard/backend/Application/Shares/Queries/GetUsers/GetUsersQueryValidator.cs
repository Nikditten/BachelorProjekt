using FluentValidation;

namespace Application.Shares.Queries.GetUsers
{
    public class GetUsersQueryValidator : AbstractValidator<GetUsersQuery>
    {
        public GetUsersQueryValidator()
        {
            RuleFor(x => x.WebsiteId).NotEmpty();
        }
    }
}