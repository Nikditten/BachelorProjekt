using MediatR;

namespace Application.Websites.Queries.GetWebsites
{
    public class GetWebsitesQuery : IRequest<List<UserWebsiteDTO>> { }
}