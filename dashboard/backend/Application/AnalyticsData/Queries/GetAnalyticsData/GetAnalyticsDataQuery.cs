using Application.DTOs;
using MediatR;

namespace Application.AnalyticsData.Queries.GetAnalyticsData
{

    public class GetAnalyticsDataQuery : IRequest<AnalyticsDataDTO>
    {
        public Guid websiteId { get; set; }
    }

}