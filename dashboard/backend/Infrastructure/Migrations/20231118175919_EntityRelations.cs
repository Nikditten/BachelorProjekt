using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class EntityRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Websites_UserId",
                table: "Websites",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Websites_Users_UserId",
                table: "Websites",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Websites_Users_UserId",
                table: "Websites");

            migrationBuilder.DropIndex(
                name: "IX_Websites_UserId",
                table: "Websites");
        }
    }
}
