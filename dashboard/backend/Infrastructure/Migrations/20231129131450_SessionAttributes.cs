using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SessionAttributes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Refferer",
                table: "Sessions",
                newName: "OS");

            migrationBuilder.AddColumn<string>(
                name: "Language",
                table: "Sessions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Orientation",
                table: "Sessions",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Language",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "Orientation",
                table: "Sessions");

            migrationBuilder.RenameColumn(
                name: "OS",
                table: "Sessions",
                newName: "Refferer");
        }
    }
}
