namespace Application.Shares.Queries.GetUsers
{
    public class SharedUserDTO
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Username { get; set; }
    }
}