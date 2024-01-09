using Application.DTOs;
using Application.Shares.Queries.GetUsers;
using Application.Websites.Commands.CreateWebsite;
using AutoMapper;
using Domain.Entities;

namespace Application.Common.Mapping
{
    public class AutoMapperProfile : Profile
    {
        // SOURCE: https://www.youtube.com/watch?v=AxHER2SlIjg&ab_channel=PatrickGod
        public AutoMapperProfile()
        {
            CreateMap<User, UserDTO>();
            CreateMap<User, SharedUserDTO>();
            CreateMap<Shared, SharedDTO>();
            CreateMap<Website, WebsiteDTO>();
            CreateMap<Website, CreatedWebsiteDTO>();
        }
    }
}