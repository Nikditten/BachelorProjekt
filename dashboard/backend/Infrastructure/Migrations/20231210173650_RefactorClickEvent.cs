using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RefactorClickEvent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentURL",
                table: "ClickEvents");

            migrationBuilder.RenameColumn(
                name: "Value",
                table: "ClickEvents",
                newName: "ElementText");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "ClickEvents",
                newName: "ElementTag");

            migrationBuilder.RenameColumn(
                name: "TagName",
                table: "ClickEvents",
                newName: "ButtonType");

            migrationBuilder.AlterColumn<string>(
                name: "ElementID",
                table: "ClickEvents",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ElementText",
                table: "ClickEvents",
                newName: "Value");

            migrationBuilder.RenameColumn(
                name: "ElementTag",
                table: "ClickEvents",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "ButtonType",
                table: "ClickEvents",
                newName: "TagName");

            migrationBuilder.AlterColumn<string>(
                name: "ElementID",
                table: "ClickEvents",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "CurrentURL",
                table: "ClickEvents",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
