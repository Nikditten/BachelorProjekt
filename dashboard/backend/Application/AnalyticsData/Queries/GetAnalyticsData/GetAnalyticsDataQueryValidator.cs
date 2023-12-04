using Application.ClickEvents.Commands.CreateClickEvent;
using FluentValidation;

namespace Application.AnalyticsData.Queries.GetAnalyticsData
{
    public class GetAnalyticsDataQueryValidator : AbstractValidator<GetAnalyticsDataQuery>
    {
        public GetAnalyticsDataQueryValidator()
        {
            RuleFor(x => x.websiteId)
                .NotEmpty();
        }
    }
}