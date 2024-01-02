using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ClickEventElementtype : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndedAt",
                table: "Sessions");

            // migrationBuilder.AlterColumn<int>(
            //     name: "ElementType",
            //     table: "ClickEvents",
            //     type: "integer",
            //     nullable: false,
            //     oldClrType: typeof(string),
            //     oldType: "text");

            migrationBuilder.Sql(
                "ALTER TABLE \"ClickEvents\" ALTER COLUMN \"ElementType\" set default 0");

            migrationBuilder.Sql(
                "ALTER TABLE \"ClickEvents\" ALTER COLUMN \"ElementType\" TYPE integer USING (\"ElementType\"::integer)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "EndedAt",
                table: "Sessions",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ElementType",
                table: "ClickEvents",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");
        }
    }
}
