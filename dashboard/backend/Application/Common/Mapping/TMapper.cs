
using AutoMapper;

namespace Application.Common.Mapping
{
    // SOURCE: https://www.youtube.com/watch?v=nipWCxIXSY0
    public static class TMapper<TSource, TDestination>
    {
        private static Mapper _mapper = new Mapper(new MapperConfiguration(
            cfg =>
                cfg.CreateMap<TSource, TDestination>().ReverseMap()
            ));

        public static TDestination Map(TSource source)
        {
            return _mapper.Map<TDestination>(source);
        }

        public static List<TDestination> MapList(List<TSource> source)
        {
            var list = new List<TDestination>();

            source.ForEach(item => list.Add(Map(item)));

            return list;
        }
    }
}

