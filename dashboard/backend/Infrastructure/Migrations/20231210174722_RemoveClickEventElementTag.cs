using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemoveClickEventElementTag : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ButtonType",
                table: "ClickEvents");

            migrationBuilder.RenameColumn(
                name: "ElementTag",
                table: "ClickEvents",
                newName: "ElementType");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ElementType",
                table: "ClickEvents",
                newName: "ElementTag");

            migrationBuilder.AddColumn<string>(
                name: "ButtonType",
                table: "ClickEvents",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
