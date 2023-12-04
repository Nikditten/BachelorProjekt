using Application.DTOs;
using MediatR;

namespace Application.AnalyticsData.Queries.GetAnalyticsData
{

    public class GetAnalyticsDataQuery : IRequest<List<AnalyticsDataDTO>>
    {
        public string websiteId { get; set; }
    }

}