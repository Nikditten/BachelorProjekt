using Domain.Enums;
using Domain.Common;

namespace Domain.Entities
{
    public sealed class Session : BaseEntity
    {
        public required Guid WebsiteId { get; set; }

        public required int DeviceWidth { get; set; }

        public required string Browser { get; set; }

        public required string Language { get; set; }

        public required ScreenOrientation Orientation { get; set; }

        public required bool IsPWA { get; set; }

        public Website? Website { get; set; }

        public ICollection<ClickEvent>? ClickEvents { get; set; }

        public ICollection<NavigationEvent>? NavigationEvents { get; set; }

        public ICollection<VideoSession>? VideoSessions { get; set; }
    }
}
