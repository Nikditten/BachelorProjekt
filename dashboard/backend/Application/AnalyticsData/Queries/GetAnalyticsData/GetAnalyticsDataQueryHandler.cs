using Application.Common.Interfaces;
using Application.DTOs;
using AutoMapper;
using MediatR;

namespace Application.AnalyticsData.Queries.GetAnalyticsData
{
    public class GetAnalyticsDataQueryHandler : IRequestHandler<GetAnalyticsDataQuery, List<AnalyticsDataDTO>>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public GetAnalyticsDataQueryHandler(IApplicationDbContext applicationDbContext, IUserService userService, IMapper mapper)
        {
            _applicationDbContext = applicationDbContext;
            _userService = userService;
            _mapper = mapper;
        }

        public async Task<List<AnalyticsDataDTO>> Handle(GetAnalyticsDataQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}