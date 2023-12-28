using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddNavigationEventTypeAttribute : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LandingPage",
                table: "Sessions");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "NavigationEvents",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "NavigationEvents");

            migrationBuilder.AddColumn<string>(
                name: "LandingPage",
                table: "Sessions",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
